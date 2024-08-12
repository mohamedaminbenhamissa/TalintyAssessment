import { assign, createMachine } from "xstate";

export type StepsContext = {
  currentStep: number;
  jobName: string;
  testName: string;
  packId: string;
  estimatedTime: number;
  numberTotalOfQuestions: number;
  firstName: string;
  webcamScreenshots: boolean;
  numberOfVideoQuestions: number;
  enableExtraTime: boolean;
  introVideo: string;
  jobImage: string;
  enableFeedBack: boolean;
  outroVideo: string;
  numberOfQuestionsInCurrentPack: number;
  testDescription: string;
  allowedTime: number;
  evaluationStaus: string;
  packs: any;
  packsStarted?: any;
};

const initialContext: StepsContext = {
  currentStep: 1,
  jobName: "",
  testName: "",
  packId: "",
  testDescription: "",
  numberOfQuestionsInCurrentPack: 0,
  estimatedTime: 0,
  numberTotalOfQuestions: 0,
  firstName: "",
  webcamScreenshots: false,
  numberOfVideoQuestions: 0,
  enableExtraTime: false,
  jobImage: "",
  introVideo: "",
  enableFeedBack: false,
  outroVideo: "",
  allowedTime: 0,
  evaluationStaus: "",
  packs: [],
  packsStarted: [],
};

type StepsEvent =
  | { type: "updateContext"; context: Partial<StepsContext> }
  | { type: "next" }
  | { type: "previous" }
  | { type: "OnSubmit" }
  | { type: "evalExpired" }
  | { type: "CallResult" }
  | { type: "CallStart" }
  | { type: "CallFeedback" }
  | { type: "SubmitFeedback" };

export const stepsMachine = createMachine<
  StepsContext,
  StepsEvent,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>({
  id: "steps",
  context: initialContext,
  initial: "checkStatus",
  on: {
    updateContext: {
      actions: assign({
        enableExtraTime: ({ event }) => event.context.enableExtraTime,
        enableFeedBack: ({ event }) => event.context.enableFeedBack,
        numberOfVideoQuestions: ({ event }) =>
          event.context.numberOfVideoQuestions,
        webcamScreenshots: ({ event }) => event.context.webcamScreenshots,
        evaluationStaus: ({ event }) => {
          console.log(
            "Updated evaluationStaus ok:",
            event.context.evaluationStaus
          );
          return event.context.evaluationStaus;
        },
      }),
    },
  },
  states: {
    checkStatus: {
      always: [
        {
          target: "INIT",
          guard: ({ context }: { context: StepsContext }) =>
            context.evaluationStaus === "Init",
        },
        {
          target: "START",
          guard: ({ context }: { context: StepsContext }) =>
            context.evaluationStaus === "InProgress",
        },
        {
          target: "EVALEXPIRED",
          guard: ({ context }: { context: StepsContext }) =>
            context.evaluationStaus === "Locked",
        },
        {
          target: "RESULTS",
          guard: ({ context }: { context: StepsContext }) =>
            context.evaluationStaus === "Finished",
        },
      ],
    },
    INIT: {
      on: {
        next: [
          {
            target: "EXTRA_TIME",
            guard: ({ context }: { context: StepsContext }) =>
              context.enableExtraTime,
          },
          {
            target: "CONFIG_WEBCAM",
            guard: ({ context }: { context: StepsContext }) =>
              context.webcamScreenshots || context.numberOfVideoQuestions > 0,
          },
          { target: "CONSENT" },
        ],
      },
    },
    EXTRA_TIME: {
      on: {
        next: "CONFIG_WEBCAM",
        previous: "INIT",
      },
    },
    CONFIG_WEBCAM: {
      on: {
        next: "CONSENT",
        previous: [
          {
            target: "EXTRA_TIME",
            guard: ({ context }: { context: StepsContext }) =>
              context.enableExtraTime,
          },
          { target: "INIT" },
        ],
      },
    },
    CONSENT: {
      on: {
        next: "START",
        previous: [
          {
            target: "CONFIG_WEBCAM",
            guard: ({ context }: { context: StepsContext }) =>
              context.webcamScreenshots || context.numberOfVideoQuestions > 0,
          },
          { target: "INIT" },
        ],
      },
    },
    START: {
      on: {
        next: "IN_PROGRESS",
        previous: "CONSENT",
      },
    },
    IN_PROGRESS: {
      entry: () => {
        console.log("In progress  event handled, transitioned to ");
      },
      on: {
        CallFeedback: "FEEDBACK",
        CallStart: "START",
        CallResult: "LOCKED",
        evalExpired: "EVALEXPIRED",
      },
    },
    FEEDBACK: {
      entry: () => {
        console.log("CallFeedback event handled, transitioned to FEEDBACK");
      },
      on: {
        next: [
          {
            target: "LOCKED",
            guard: ({ context }: { context: StepsContext }) =>
              context.outroVideo.length > 0,
          },
          {
            target: "START",
            guard: ({ context }: { context: StepsContext }) =>
              context.evaluationStaus === "InProgress",
          },
          { target: "RESULTS" },
          {
            actions: "SubmitFeedback",
          },
         
        ],
        CallResult: "LOCKED",
      },
    },
    RESULTS: {
      on: {
        next: "LOCKED",
        previous: "FEEDBACK",
      },
    },
    EVALEXPIRED: {
      on: {
        next: "FEEDBACK",
      },
    },
    TIMEOUT: {},
    LOCKED: {
      type: "final",
    },
  },
});
 
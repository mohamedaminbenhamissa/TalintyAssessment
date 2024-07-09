import { assign, createMachine } from "xstate";

export interface StepsContext {
  currentStep: number;
  jobName: string;
  testName: string;
  estimatedTime: number;
  numberOfQuestions: number;
  firstName: string;
  webcamScreenshots: boolean;
  numberOfVideoQuestions: number;
  enableExtraTime: boolean;
  introVideo: string;
  enableFeedBack: boolean;
  outroVideo: string;
}

const initialContext: StepsContext = {
  currentStep: 1,
  jobName: "",
  testName: "",
  estimatedTime: 0,
  numberOfQuestions: 0,
  firstName: "",
  webcamScreenshots: false,
  numberOfVideoQuestions: 0,
  enableExtraTime: false,
  introVideo: "",
  enableFeedBack: false,
  outroVideo: "",
};

type StepsEvent =
  | { type: "updateContext"; context: StepsContext }
  | { type: "next" }
  | { type: "previous" }
  | { type: "evalExpired" };

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
  initial: "INIT",
  context: initialContext,
  on: {
    updateContext: {
      actions: assign({
        enableExtraTime: ({ event }) => event.context.enableExtraTime,
        enableFeedBack: ({ event }) => event.context.enableFeedBack,
        numberOfVideoQuestions: ({ event }) =>
          event.context.numberOfVideoQuestions,
        webcamScreenshots: ({ event }) => event.context.webcamScreenshots,
      }),
    },
  },
  states: {
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
      on: {
        next: [
          {
            target: "FEEDBACK",
            guard: ({ context }: { context: StepsContext }) =>
              context.enableFeedBack,
          },
          { target: "RESULTS" },
        ],
        previous: "START",
        evalExpired: "EVALEXPIRED",
      },
    },
    FEEDBACK: {
      on: {
        next: [
          {
            target: "LOCKED",
            guard: ({ context }: { context: StepsContext }) =>
              context.outroVideo.length > 0,
          },
          { target: "RESULTS" },
        ],
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

import { createMachine } from "xstate";
import { Guard } from "xstate/guards";

interface StepsContext {
  currentStep: number;
  userName?: string; // Optional userName field to store user's name
}

type StepsEvent = { type: "next" } | { type: "previous" };

// Guard function to check if userName is defined
const hasName: Guard<StepsContext, StepsEvent> = (
  context: StepsContext,
  event: StepsEvent
) => {
  return context.userName !== undefined && context.userName.trim() !== "";
};

export const stepsMachine = createMachine<StepsContext, StepsEvent>(
  {
    id: "steps",
    initial: "INIT",
    context: {
      currentStep: 1,
      userName: "",
    },
    states: {
      INIT: {
        on: {
          next: "EXTRA_TIME",
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
          previous: "EXTRA_TIME",
        },
      },
      CONSENT: {
        on: {
          next: "START",
          previous: "CONFIG_WEBCAM",
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
          next: "FEEDBACK",
          previous: "START",
        },
      },
      FEEDBACK: {
        on: {
          next: "RESULTS",
          previous: "IN_PROGRESS",
        },
      },
      RESULTS: {
        on: {
          next: "LOCKED",
          previous: "FEEDBACK",
        },
      },
      LOCKED: {
        on: {},
      },
      BREAK: {
        on: {
          previous: "LOCKED",
        },
      },
    },
  },
  {
    guards: {
      hasName,
    },
  }
);

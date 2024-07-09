import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setup } from "xstate";
import gtm from "../../utils/gtm";

const { evaluationId } = useParams();
useEffect(() => {
  gtm.push(`Evaluation-${evaluationId}`);
}, []);

export const Evaluation = setup({
  types: {
    context: {} as { steps: string },
    events: {} as
      | {
          type: "INIT";
        }
      | {
          type: "EXTRA_TIME";
        }
      | {
          type: "CONFIG_WEBCAM";
        }
      | { type: "CONSENT" }
      | {
          type: "START";
        }
      | { type: "IN_PROGRESS" }
      | { type: "FEEDBACK" }
      | {
          type: "RESULTS";
        }
      | { type: "LOCKED" }
      | { type: "BREAK" }
      | { type: "TIMEOUT" }
      | { type: "EVALEXPIRED" }
      | { type: "next" }
      | { type: "privious" },
  },
  guards: {
    feedbackValid: ({ context }) => context.steps.length > 0,
  },
}).createMachine({
  id: "steps",
  initial: "Init",
  context: {
    steps: "",
  },
  states: {
    prompt: {
      on: {
        INIT: "Init",
      },
    },
    thanks: {},
    closed: {
      on: {
        next: "prompt",
      },
    },
  },
  on: {
    privious: ".closed",
  },
});

import {Toast} from "@geist-ui/react/dist/use-toasts/use-toast";

const DEFAULT_DELAY = 1000 * 6;

export const makeErrorToast = (message: string): Toast => {
  return {text: message, type: "error", delay: DEFAULT_DELAY}
}

export const makeSuccessToast = (message: string): Toast => {
  return {text: message, type: "success", delay: DEFAULT_DELAY}
}
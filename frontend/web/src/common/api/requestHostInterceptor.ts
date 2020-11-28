import {Action} from "react-fetching-library";

export const requestHostInterceptor = (host: string) => (client: any) => async (action: Action) => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
    headers: {
      ...action?.headers,
      "Content-Type": "application/json"
    }
  };
};
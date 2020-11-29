import {Action, createClient} from 'react-fetching-library';
import {cache} from './cache';
import {API_BASE_URL} from "@common/api/_constants";

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

const client = createClient({
  cacheProvider: cache as any,
  requestInterceptors: [requestHostInterceptor(API_BASE_URL)]
});

export default client;

import {createClient} from 'react-fetching-library';
import {cache} from './cache';
import {requestHostInterceptor} from "@common/api/requestHostInterceptor";

const API_BASE_URL = process.env["API_URL"] || '/api'

const client = createClient({
  cacheProvider: cache as any,
  requestInterceptors: [requestHostInterceptor(API_BASE_URL)]
});

export default client;

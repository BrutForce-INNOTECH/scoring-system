import {createClient} from 'react-fetching-library';
import {cache} from './cache';
import {buildAxiosFetch} from "@common/api/buildAxiosFetch";
import axiosClient from "@common/api/axiosClient";

const client = createClient({
  cacheProvider: cache as any,
  fetch: buildAxiosFetch(axiosClient),
});

export default client;

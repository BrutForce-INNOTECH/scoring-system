import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient} from "./_constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {

  // const response = await apiClient.get("");

  return res.json({hello: _req.body});
};

export default handler;
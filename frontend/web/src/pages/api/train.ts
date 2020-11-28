import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient} from "./_constants";

// https://vk.com/durov
const COUNT = 10;

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {

  const response = await apiClient.post("/add_data", {
    urls: _req.body,
    count: COUNT
  });

  return res.json({status: response.status});
};

export default handler;
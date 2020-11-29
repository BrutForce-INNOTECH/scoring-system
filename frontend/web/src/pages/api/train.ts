import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient} from "./_constants";

// https://vk.com/durov
// test = https://vk.com/friomusic
const COUNT = 10;

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post("/add_data", {
      count: COUNT,
      ..._req.body
    });

    return res.json({status: response.status === 200 ? "ok" : "error"});
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
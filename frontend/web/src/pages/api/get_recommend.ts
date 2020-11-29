import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient, convertResponse} from "./_constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post("/get_recommend", {
      ..._req.body
    });

    return res.json(response.data);
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
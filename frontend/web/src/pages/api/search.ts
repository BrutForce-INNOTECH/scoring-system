import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient} from "./_constants";

const THRESH = 0.65

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post("/search", {
      thresh: THRESH,
      ..._req.body
    });

    return res.json({data: response.data});
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
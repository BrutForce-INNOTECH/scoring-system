import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient, convertResponse} from "./_constants";

const THRESH = 0.4

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post("/search", {
      thresh: THRESH,
      ..._req.body
    });

    const data = JSON.parse(convertResponse(response.data));
    return res.json({data: data});
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
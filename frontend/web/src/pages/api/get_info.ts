import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient} from "./_constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post<any>("/get_info", {
      ..._req.body
    });

    return res.json(response.data);
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
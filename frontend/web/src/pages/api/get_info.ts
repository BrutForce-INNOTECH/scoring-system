import {NextApiRequest, NextApiResponse} from 'next';
import {apiClient, convertResponse} from "./_constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiClient.post("/get_info", {
      ..._req.body
    });

    // console.log(convertResponse(response.data));
    const data = JSON.parse(convertResponse(response.data));
    return res.json({data: data});
  } catch (ex) {
    return res.json({error: ex.message});
  }
};

export default handler;
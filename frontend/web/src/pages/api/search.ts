import {NextApiRequest, NextApiResponse} from 'next';

const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  return res.json({hello: 'world!'});
};

export default handler;
import * as dotenv from 'dotenv'

dotenv.config()



export const config = {
  domain: process.env.APP_HOST ?? 'localhost',
  port: process.env.APP_PORT ?? 3000,
  apiUrl: process.env.FILMATRON_SERVER_URL ?? 'https://45.77.182.167/graphql',
  admin: {
    // wallet address that admin will sign transaction when film maker action create a collection for their NFT collection
    publickKey: process.env.ADMIN_PUBLICK_KEY ?? '89Fh4QKhCEJ5rC1Bf4utchfmqPNejYTfjoW6VxDL8YqB'
  }
}

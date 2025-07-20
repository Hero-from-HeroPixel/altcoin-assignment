import dotenv from 'dotenv';

//*Load env values
dotenv.config();


export const cryptoKey = process.env.CRYPTO_API_KEY
export const port = Number(process.env.PORT) || 3000
export const nodeEnv = process.env.NODE_ENV || 'development'
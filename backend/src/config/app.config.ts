import { cryptoKey, port, nodeEnv } from './app.keys.ts';
import type { AxiosHeaders } from 'axios';

interface AppConfig {
    port: number;
    nodeEnv: string;
    cryptoKey: string
    cryptoApiBaseUrl: string
    cryptoAPIHeaders: AxiosHeaders | Partial<AxiosHeaders>
}

if (!cryptoKey) throw new Error("Crypto API not set.")

const geckoAPIVersion = 3

const appConfig: AppConfig = {
    port,
    nodeEnv,
    cryptoKey,
    cryptoApiBaseUrl: `https://api.coingecko.com/api/v${geckoAPIVersion}`,
    cryptoAPIHeaders: {
        'x-cg-demo-api-key': cryptoKey
    }
};

export default appConfig;
import { apiClient } from "../utils/apiClient";
import useSWR from "swr";

export function useGetCrypto() {
    const fetcher = async (url: string) =>
        await apiClient.get(url).then((res) => res.data);
    const { data, error, isLoading, mutate } = useSWR<GetCryptoResponse>(
        "/cryptos",
        fetcher
    );

    return { data, error, isLoading, mutate };
}
export interface GetCryptoResponse {
    source: string;
    data: Crypto[];
}

export interface Crypto {
    id: number;
    nameIdentifier: string;
    name: string;
    symbol: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    priceChangePercentage24h?: number | null;
    high24h: number;
    low24h: number;
    createdAt: Date;
    updatedAt: Date;
}

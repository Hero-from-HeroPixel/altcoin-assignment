import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export function useGetCrypto() {
    const [data, setData] = useState<GetCryptoResponse>();
    useEffect(() => {
        const fetchCryptos = async () => {
            const response = await apiClient.get<GetCryptoResponse>("cryptos");
            setData(response.data);
        };

        fetchCryptos();
    }, []);

    return { data };
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

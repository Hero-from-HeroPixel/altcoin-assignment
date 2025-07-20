import { apiClient } from "../utils/apiClient";
import useSWR, { type SWRResponse } from "swr";

/**
 * Custom React hook to fetch cryptocurrency data from the API.
 * Uses SWR for data caching, revalidation, and loading states.
 *
 * @returns {SWRResponse} Contains:
 *   - data: Parsed crypto response (see GetCryptoResponse)
 *   - error: Error object if the fetch fails
 *   - isLoading: Boolean indicating loading state
 *   - mutate: SWR mutate function for manual refresh
 */
export function useGetCrypto(): SWRResponse {
    const fetcher = async (url: string) =>
        await apiClient.get(url).then((res) => res.data);

    const swrResponse = useSWR<GetCryptoResponse>("/cryptos", fetcher, {
        refreshInterval: 15000, // Auto-refresh every 15 seconds
    });

    return swrResponse;
}

/**
 * Type definition for the response from the /cryptos endpoint.
 */
export interface GetCryptoResponse {
    source: string;
    data: Crypto[]; // Array of crypto asset data
}

/**
 * Type definition for a single cryptocurrency asset.
 */
export interface Crypto {
    id: number;
    nameIdentifier: string; // Unique identifier (e.g., slug)
    name: string; // Full name of the crypto asset
    symbol: string; // Ticker symbol (e.g., BTC, ETH)
    image: string; // URL to logo/image
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    priceChangePercentage24h?: number | null;
    high24h: number;
    low24h: number;
    createdAt: Date;
    updatedAt: Date;
}

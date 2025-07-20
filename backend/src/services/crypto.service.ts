/**
 * Fetches a list of cryptocurrency market data from the external API.
 *
 * @param params - Optional parameters to customize the request:
 *   - `page`: The page number to retrieve (default: 1).
 *   - `pageLength`: The number of coins per page (default: 100).
 *   - `currency`: The fiat currency to use for price conversion (default: 'zar').
 *   - `currencyPrecision`: The number of decimal places for currency values (default: 2).
 *
 * @returns A promise that resolves to an array of coin market data objects.
 *
 * @throws Will handle and rethrow errors using the `axiosErrhandler` utility if the request fails.
 */
import { AxiosError } from 'axios';
import { cryptoApi, axiosErrhandler } from '../config/axios.config.ts'
import type { GetCoinsResponseBody } from '../types/crypto.types.ts';
const getCoinsDefaultParams = {
    page: 1,
    pageLength: 100,
    currency: 'zar',
    currencyPrecision: 2
}

export async function getCoins(params: typeof getCoinsDefaultParams = getCoinsDefaultParams) {
    try {
        const res = await cryptoApi.get<GetCoinsResponseBody[]>(`/coins/markets`, {
            params: {
                vs_currency: params.currency,
                per_page: params.pageLength,
                page: params.page,
                locale: 'en',
                precision: params.currencyPrecision,
                order: 'market_cap_desc'
            }
        })
        const data = res.data
        return data
    } catch (e) {
        const err = e as AxiosError
        axiosErrhandler(err, 'Failed to fetch coin market data')
    }
}
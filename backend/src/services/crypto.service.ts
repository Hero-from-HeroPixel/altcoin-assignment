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
                precision: params.currencyPrecision
            }
        })
        const data = res.data
        return data
    } catch (e) {
        const err = e as AxiosError
        axiosErrhandler(err, 'Failed to fetch coin market data')
    }
}
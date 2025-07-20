/**
 * *Controller: getCryptos*
 *
 * *Purpose:*
 * - Retrieves a list of cryptocurrencies from an external service.
 * - Caches the response in Redis for short-term performance boost.
 * - Persists snapshot data to the database for historical tracking.
 *
 * *Features:*
 * - Uses SHA-1 hash of the request URL to build a unique Redis cache key.
 * - Caches data for 60 seconds (configurable).
 * - Logs cache hits for observability.
 * - Converts floating point values to cents to preserve currency precision.
 * - Leverages `Coin.createOrUpdate` for idempotent data persistence.
 *
 * *Response Structure:*
 * - `{ source: 'cache' | 'api', data: Coin[] }`
 *
 * *Status Codes:*
 * - `200`: Fresh API data served
 * - `204`: No data found from the API
 */
import type { Request, Response, NextFunction } from 'express'
import { getCoins } from '../services/crypto.service.ts'
import { Coin, type CoinCreationAttributes } from '../models/Coin.ts'
import { redisClient } from '../database/redis.database.ts'
import { hash } from 'crypto'

// Controller to fetch and cache cryptocurrency data
export const getCryptos = async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = `${req.path}:${hash('sha1', req.url)}`
    const cacheExpiry = 60 // seconds

    // Attempt to retrieve data from Redis cache
    const cacheData = await redisClient.get(cacheKey)

    if (cacheData) {
        const data = await JSON.parse(cacheData)
        console.log(`Cache hit on ${req.originalUrl}`)
        return res.json({
            source: 'cache',
            data
        })
    }

    // Cache miss: fetch fresh data from external service
    try {
        const data = await getCoins()
        if (!data) return res.json(data).status(204)

        const coins: Coin[] = []

        // Transform and persist data
        for (const item of data) {
            const snapshotValues: CoinCreationAttributes = {
                nameIdentifier: item.id,
                name: item.name,
                symbol: item.symbol,
                image: item.image,
                currentPrice: item.current_price * 100, // Convert to cents
                marketCap: item.market_cap * 100,        // Convert to cents
                marketCapRank: item.market_cap_rank,
                priceChangePercentage24h: item.price_change_percentage_24h,
                high24h: item.high_24h,
                low24h: item.low_24h,
            }

            coins.push(await Coin.createOrUpdate(snapshotValues))
        }

        // Cache the processed data
        await redisClient.set(cacheKey, JSON.stringify(coins), {
            expiration: { type: 'EX', value: cacheExpiry }
        })

        return res.json({
            source: 'api',
            data: coins
        }).status(200)
    } catch (e) {
        next(e)
    }
}
import type { Request, Response, NextFunction } from 'express';
import { getCoins } from '../services/crypto.service.ts';
import { Coin, type CoinCreationAttributes } from '../models/Coin.ts';
import { redisClient } from '../database/redis.database.ts';
import { hash } from 'crypto';

// Get list of cryptos
export const getCryptos = async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = `${req.path}:${hash('sha1', req.url)}`
    const cacheExpiry = 60 //60 seconds
    const cacheData = await redisClient.get(cacheKey)

    if (cacheData) {
        const data = await JSON.parse(cacheData)
        console.log(`Cache hit on ${req.originalUrl}`)
        return res.json({
            source: 'cache',
            data
        })
    }

    //Cache miss or stale. Retrieve fresh data from Crypto service
    try {
        const data = await getCoins()
        if (!data) return res.json(data).status(204)
        const coins: Coin[] = []

        //Store fresh data in database
        for (const item of data) {
            const snapshotValues: CoinCreationAttributes = {
                nameIdentifier: item.id,
                name: item.name,
                symbol: item.symbol,
                image: item.image,
                currentPrice: item.current_price * 100, //Convert floating point currency into cents
                marketCap: item.market_cap * 100, //Convert floating point currency into cents
                marketCapRank: item.market_cap_rank,
                priceChangePercentage24h: item.price_change_percentage_24h,
                high24h: item.high_24h,
                low24h: item.low_24h,
            }
            coins.push(await Coin.createOrUpdate(snapshotValues))
        }
        // Store fresh data in cache
        await redisClient.set(cacheKey, JSON.stringify(coins), { expiration: { type: 'EX', value: cacheExpiry } })

        return res.json({
            source: 'api',
            data: coins
        }).status(200)
    } catch (e) {
        next(e)
    }
}
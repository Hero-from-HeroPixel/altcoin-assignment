import { DataTypes, Model, type Optional } from "sequelize";
import { dbClient } from "../database/db.database.ts";

/**
 * @description Any currency type fields use ZAR as a currency
 * @property {number} id - Primary key. IMO it is better to use integers for primary keys instead of strings (natural keys)
 * @property {string} name - Unique coin name
 * @property {string} symbol - Symbol for the coin. Must be unique
 * @property {string} image - Coin logo/image url
 * @property {number} currentPrice - Current market price of coin stored in cents.
 * @property {number} marketCap - Current Market cap of coin stored in cents.
 * @property {number} marketCapRank - Rank in market based on market cap. Must be unique
 */

type CoinAttributes = {
    id: number
    name: string
    symbol: string
    image?: string
    currentPrice: number
    marketCap: number
    marketCapRank?: number
}

type CoinCreationAttributes = Optional<CoinAttributes, 'id'>;

export class Coin extends Model<CoinAttributes, CoinCreationAttributes> {
    static async bulkCreateOrUpdate(items: CoinCreationAttributes[]) {
        let coins: Coin[] = []
        for (const item of items) {
            coins.push(await Coin.createOrUpdate(item))
        }
        return coins
    }

    static async createOrUpdate(attributes: CoinCreationAttributes) {
        const [coin, created] = await Coin.findOrCreate({
            where: { name: attributes.name },
            defaults: attributes
        })

        if (created)
            return coin
        else {
            const updatedCoin = await coin.update(attributes)
            return updatedCoin
        }
    }
}

await Coin.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    currentPrice: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    marketCap: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    marketCapRank: {
        type: DataTypes.INTEGER.UNSIGNED,
    }
}, {
    sequelize: dbClient,
    modelName: 'Coin',
    indexes: [
        { fields: ['name', 'marketCap', 'symbol'], unique: true }
    ]
}).sync({ alter: true })


/**
 * Represents a cryptocurrency coin tracked in the system.
 *
 * /**
 * @remarks
 *  *Storing Currency in Cents Using BIGINT
 *
 * *Justification:*
 * - Storing currency values in cents (as integers) avoids floating-point precision errors that can occur when using `FLOAT` or `DOUBLE` types for monetary values.
 * - Using `BIGINT` allows for a much larger range of values, accommodating high-value transactions and market caps without risk of overflow.
 * - Integer arithmetic is deterministic and reliable, which is critical for financial calculations.
 *
 * *Pros:*
 * - **Precision:** Eliminates rounding errors and floating-point inaccuracies.
 * - **Consistency:** Ensures all currency values are stored in the smallest unit (cents), making calculations straightforward and less error-prone.
 * - **Scalability:** `BIGINT` supports very large numbers, suitable for cryptocurrencies with high market caps or prices.
 * - **Interoperability:** Many financial systems and APIs use integer representations for currency, making integration easier.
 *
 * *Cons:*
 * - **Readability:** Values must be converted (e.g., divided by 100) for display in standard currency format, which can add complexity to presentation logic.
 * - **Storage:** `BIGINT` consumes more storage than smaller integer types, though this is generally negligible compared to the benefits.
 * - **Developer Overhead:** Developers must remember to always handle conversions between cents and standard units, which can lead to mistakes if overlooked.
 *
 * @remarks
 * - All currency-related fields use ZAR (South African Rand) as the currency.
 * - Primary keys use integers for efficiency and consistency.
 * - Uniqueness is enforced on the combination of `name`, `marketCap`, and `symbol`.
 *
 * @property {number} id - Auto-incremented primary key.
 * @property {string} nameIdentifier - Identifier for the coin, typically retrieved from an external API.
 * @property {string} name - Unique name of the coin.
 * @property {string} symbol - Unique symbol representing the coin.
 * @property {string} [image] - Optional URL to the coin's logo or image.
 * @property {number} currentPrice - Current market price of the coin, stored in cents.
 * @property {number} marketCap - Current market capitalization of the coin, stored in cents.
 * @property {number} [marketCapRank] - Optional rank of the coin based on market capitalization.
 * @property {number} priceChangePercentage24h - Percentage change in price over the last 24 hours.
 * @property {number} high24h - Highest price of the coin in the last 24 hours, stored in cents.
 * @property {number} low24h - Lowest price of the coin in the last 24 hours, stored in cents.
 *
 * @method static bulkCreateOrUpdate
 * Performs a bulk upsert (create or update) operation for an array of coin attributes.
 * @param items - Array of coin creation attributes.
 * @returns Promise resolving to an array of Coin instances.
 *
 * @method static createOrUpdate
 * Creates a new coin or updates an existing one based on the unique name.
 * @param attributes - Coin creation attributes.
 * @returns Promise resolving to the created or updated Coin instance.
 */
import { DataTypes, Model, type Optional } from "sequelize";
import { dbClient } from "../database/db.database.ts";

type CoinAttributes = {
    id: number
    nameIdentifier: string
    name: string
    symbol: string
    image?: string
    currentPrice: number
    marketCap: number
    marketCapRank?: number
    priceChangePercentage24h: number
    high24h: number
    low24h: number
}

export type CoinCreationAttributes = Optional<CoinAttributes, 'id'>;

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
    nameIdentifier: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    priceChangePercentage24h: {
        type: DataTypes.FLOAT
    },
    high24h: {
        type: DataTypes.BIGINT
    },
    low24h: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize: dbClient,
    modelName: 'Coin',
    indexes: [
        { fields: ['name', 'marketCap', 'symbol'], unique: true }
    ]
}).sync({ alter: true })


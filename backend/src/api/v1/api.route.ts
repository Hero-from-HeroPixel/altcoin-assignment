/**
 * Crypto API router for handling requests related to cryptocurrency data.
 *
 * Features:
 * - Middleware logging: Logs HTTP method and path for all incoming requests.
 * - Routes:
 *   - `GET /cryptos`: Retrieves a list of cryptocurrencies via the `getCryptos` controller.
 *   - `GET /health`: Simple health check endpoint to confirm API responsiveness.
 *
 * Notes:
 * - Middleware is useful for integrating external logging services or request tracing.
 */
import express from 'express'
import { getCryptos } from '../../controllers/crypto.controller.ts'

const router = express.Router()

// Logging middleware for all requests to this router
// Could be extended to report to an external service like Datadog or Loggly
router.use((req, res, next) => {
    console.log('%s %s', req.method, req.path)
    next()
})

// Route to fetch cryptocurrency data
router.route('/cryptos').get(getCryptos)

// Health check endpoint
router.route('/health').get((req, res) => res.send('OK'))

export default router
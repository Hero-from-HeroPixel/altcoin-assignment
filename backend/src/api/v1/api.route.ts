import express from 'express'
import { getCryptos } from '../../controllers/crypto.controller.ts'

const router = express.Router()

//* Simulate logging to external logging service
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use((req, res, next) => {
    console.log('%s %s', req.method, req.path)
    next()
})

router.route('/cryptos').get(getCryptos)

router.route('/health').get((req, res) => res.send('OK'))

export default router
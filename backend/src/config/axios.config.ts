import axios, { AxiosError } from 'axios'
import appConfig from './app.config.ts'

export const cryptoApi = axios.create({
    baseURL: appConfig.cryptoApiBaseUrl,
    timeout: 3000, //3 seconds
    headers: appConfig.cryptoAPIHeaders
})

export const axiosErrhandler = (err: AxiosError, context: string) => {
    if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        //* Simulate err logging into another service
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);

        //* Rethrow with added context
        throw new Error(`${context}: ${err.response}`)
    } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        //* Simulate err logging into another service
        console.error(err.request)

        //* Rethrow with added context
        throw new Error(`${context}: ${err.request}`)
    } else {
        // Something happened in setting up the request that triggered an Error

        //* Simulate err logging into another service
        console.error(err)

        //* Rethrow with added context
        throw new Error(`${context}: ${err}`)
    }
}
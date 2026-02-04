
import express from 'express'
import cors from 'cors'


import { globalErrorHandler } from '@middlewares'
import router from './routes'
export const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use('/api', router)
server.use(globalErrorHandler)

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Running: http://localhost:${PORT}`)
})
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { errorHandler } from './erros/error-handle'
export const server = express()

server.use(cors())
server.use(express.json())

server.use('/api', router)

server.use(errorHandler)

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Running: http://localhost:${PORT}`)
})
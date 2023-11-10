import dotenv from 'dotenv'

dotenv.config()

export default {
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'any_secret',
  port: process.env.PORT ?? 5050,
  host: process.env.HOST ?? '127.0.0.1'
}

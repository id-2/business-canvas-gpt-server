import dotenv from 'dotenv'

dotenv.config()

export default {
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'any_secret'
}

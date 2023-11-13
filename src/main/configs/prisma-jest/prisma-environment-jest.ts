import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'

dotenv.config({
  path: resolve(__dirname, '.env.test')
})

class CustomEnvironment extends NodeEnvironment {
  private readonly schema: string
  private readonly connectionString: string

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    const random = Math.random().toString()
    const randomString = random.split('.')[1]
    this.schema = `code_schema_${randomString}`
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
  }

  async setup (): Promise<void> {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString
    execSync('npx prisma db push')
  }

  async teardown (): Promise<void> {
    const client = new Client({
      connectionString: this.connectionString
    })
    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}

export default CustomEnvironment

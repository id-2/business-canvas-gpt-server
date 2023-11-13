import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment'
import NodeEnvironment from 'jest-environment-node'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config({
  path: resolve(__dirname, '.env.test')
})

class CustomEnvironment extends NodeEnvironment {
  private readonly schema: string
  private readonly connectionString: string

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.schema = `code_schema_${Math.random()}`
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

import config from './jest.config'

config.testMatch = ['**/*.spec.ts']
config.setupFiles = ['<rootDir>/src/infra/cache/redis/helpers/test-env-vars/jest-set-env-vars.ts']
export default config

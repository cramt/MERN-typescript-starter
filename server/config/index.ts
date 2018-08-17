export interface Config {
  envName: string
  port: number
  logLevel: string
}

const developmentConfig: Config = {
  envName: 'development',
  port: 3000,
  logLevel: 'debug'
}

export default developmentConfig

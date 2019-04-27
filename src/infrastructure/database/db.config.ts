export interface IDBConfig {
  host: string
  user: string
  pass: string
  port: number
  dbName: string
}

export const DBConfig: IDBConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  pass: process.env.DB_PASS || 'example',
  port: parseInt(process.env.DB_PORT || '27017', 10),
  dbName: process.env.DB_NAME || 'test-db',
}

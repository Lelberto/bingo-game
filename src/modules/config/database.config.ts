/** Database configuration */

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

export default (): { database: DatabaseConfig } => ({
  database: {
    type: process.env.DB_TYPE || 'sqlite',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  }
});

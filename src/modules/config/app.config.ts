/** Application configuration */

export type AppConfig = {
  port: number;
};

export default (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.PORT) || 8000
  }
});

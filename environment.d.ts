declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string;
      DATABASE_URL: string;
      SALT_ROUND: number;
      MAIL_ADDRESS: string;
      MAIL_PASSWORD: string;
      MAIL_HOST: string;
      MAIL_PORT: number;
      BASE_URI: string;
    }
  }
}
export {};

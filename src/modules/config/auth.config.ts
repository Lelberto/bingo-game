/** Authentication / Authorization configuration */

export type AuthConfig = {
  jwt: {
    accessToken: {
      secretKey: string;
      expiration: number;
    }
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  platformCallbackUrls: {
    web: string;
    mobile: string;
  };
}

export default (): { auth: AuthConfig } => ({
  auth: {
    jwt: {
      accessToken: {
        secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        expiration: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
      }
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL
    },
    platformCallbackUrls: {
      web: process.env.AUTH_PLATFORM_CALLBACK_URL_WEB,
      mobile: process.env.AUTH_PLATFORM_CALLBACK_URL_MOBILE
    }
  }
});

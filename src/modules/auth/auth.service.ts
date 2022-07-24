import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-google-oauth20';
import { AuthConfig } from '../config/auth.config';

@Injectable()
export class AuthService {
  
  private readonly authConfig: AuthConfig;

  public constructor(config: ConfigService) {
    this.authConfig = config.get<AuthConfig>('auth');
  }

  /**
   * Gets an user from a google profile
   * 
   * This method will create the user if he doesn't exist.
   * 
   * @param profile Google profile
   * @returns User
   */
  public getUserFromGoogle(profile: Profile): Promise<any> {
    // TODO Implement this method
    throw new Error('Method not implemented');
  }

  /**
   * Gets the callback URL from a specified platform
   * 
   * A platform callback URL is not an OAuth2 callback URL. This is just the URL of the specified
   * platform used by the `AuthController` to make redirections after user logged in with success.
   * 
   * @param platform DTY platform
   * @returns Callback URL of the platform, or `null` if the platform is not supported
   */
  public getCallbackUrl(platform: string) {
    const url = this.authConfig.platformCallbackUrls[platform];
    return url ? `${this.authConfig.platformCallbackUrls[platform]}` : null;
  }
}

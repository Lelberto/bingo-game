import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { AccessTokenPayload, RefreshTokenPayload } from '../../utils/types';
import { AuthConfig } from '../config/auth.config';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  
  private readonly authConfig: AuthConfig;
  private readonly jwtService: JwtService;
  private readonly userService: UserService;

  public constructor(config: ConfigService, jwtService: JwtService, userService: UserService) {
    this.authConfig = config.get<AuthConfig>('auth');
    this.jwtService = jwtService;
    this.userService = userService;
  }

  /**
   * Generates a new access token for the given user
   * 
   * @param user User for payload
   * @returns Access token
   */
   public async generateAccessToken(user: User) {
    const payload: AccessTokenPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  /**
   * Generates a new refresh token for the given user
   * 
   * @param user User for payload
   * @returns Refresh token
   */
  public async generateRefreshToken(user: User) {
    const payload: RefreshTokenPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: this.authConfig.jwt.refreshToken.secretKey,
      expiresIn: this.authConfig.jwt.refreshToken.expiration
    });
  }

  /**
   * Gets an user from a google profile
   * 
   * This method will create the user if he doesn't exist.
   * 
   * @param profile Google profile
   * @param createIfNotExists If true, the user will be created if he doesn't exist
   * @default createIfNotExists = true
   * @returns User, or `null` if the user doesn't exist and `createIfNotExists` is false
   * @async
   */
  public async getUserFromGoogle(profile: Profile, createIfNotExists = true): Promise<User> {
    const { id, emails, displayName } = profile;
    try {
      return await this.userService.findByGoogleId(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException && createIfNotExists) {
        return await this.userService.create({
          googleId: id,
          email: emails[0].value,
          username: await this.userService.generateUsername(displayName),
          name: displayName
        });
      }
      throw err;
    }
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

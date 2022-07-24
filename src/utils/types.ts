/** Constructor type */
export type Constructor<T> = { new(): T };

/** Access token payload */
export type AccessTokenPayload = { sub: string, email: string };

/** Refresh token payload */
export type RefreshTokenPayload = { sub: string, email: string };

/** Error response returned when an exception occurs */
export type ErrorResponse = {
  message: string;
  from: string;
}

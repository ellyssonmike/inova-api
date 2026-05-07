export interface ICreateSessionDto {
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

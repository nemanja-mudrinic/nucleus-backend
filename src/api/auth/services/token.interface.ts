export interface ITokenService {
  generateAccessToken(userId: string): string;
}

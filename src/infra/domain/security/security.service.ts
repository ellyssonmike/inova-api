import { Injectable } from '@nestjs/common';
import { InvalidTokenError } from './errors/invalid-token.error';
import { ConfigService } from '@config/config.service';
import { compare, hash } from 'bcrypt';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import {
  AccessTokenData,
  RefreshTokenData,
} from './interfaces/token.interfaces';
import { ExpiredTokenError } from './errors/expired-token.error';
import { ISessionResponseDto } from '@app/session/interfaces/session.dto';

interface IHashPasswordOptions {
  salts: number;
}

interface IGeneratePasswordOptions {
  length?: number;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

@Injectable()
export class SecurityService {
  constructor(private readonly config: ConfigService) {}

  generatePassword(
    {
      length = 8,
      uppercase = true,
      numbers = true,
      symbols = true,
    }: IGeneratePasswordOptions = {
      length: 8,
      uppercase: true,
      numbers: true,
      symbols: true,
    },
  ): string {
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    const charsetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsetNumbers = '0123456789';
    const charsetSymbols = '!@#$%&*()_+-=[]{}|;:,.<>?';

    let _charset = charset;
    let password = '';

    if (uppercase) {
      _charset += charsetUppercase;
      password += charsetUppercase.charAt(
        Math.floor(Math.random() * charsetUppercase.length),
      );
    }

    if (numbers) {
      _charset += charsetNumbers;
      password += charsetNumbers.charAt(
        Math.floor(Math.random() * charsetNumbers.length),
      );
    }

    if (symbols) {
      _charset += charsetSymbols;
      password += charsetSymbols.charAt(
        Math.floor(Math.random() * charsetSymbols.length),
      );
    }

    while (password.length < length) {
      password += _charset.charAt(Math.floor(Math.random() * _charset.length));
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    return password;
  }

  hashPassword(
    password: string,
    options?: IHashPasswordOptions,
  ): Promise<string> {
    return hash(password, options?.salts ?? 10);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  isHash(str: string) {
    const _r = /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;
    return _r.test(str);
  }

  generateAccessToken(user: ISessionResponseDto['user']) {
    const accessToken = sign({ user }, this.config.JWT_SECRET, {
      expiresIn: this.config.JWT_EXPIRATION_TIME,
      subject: user.id,
    });

    const decoded = this.decodeToken(accessToken);
    const expiresAt = new Date(decoded.exp * 1000);

    return { accessToken, expiresAt };
  }

  generateRefreshToken(accessToken: string) {
    const accessData = this.decodeToken(accessToken);

    const refreshToken = sign({}, this.config.JWT_REFRESH_SECRET, {
      expiresIn: this.config.JWT_REFRESH_EXPIRATION_TIME,
      subject: accessData.sub,
    });

    const decoded = this.decodeRefreshToken(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);

    return { refreshToken, expiresAt };
  }

  decodeToken(token: string): AccessTokenData {
    try {
      const data = verify(token, this.config.JWT_SECRET);
      return data as AccessTokenData;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError('Token expired');
      }

      throw new InvalidTokenError('Invalid token');
    }
  }

  decodeRefreshToken(token: string): RefreshTokenData {
    try {
      const data = verify(token, this.config.JWT_REFRESH_SECRET);
      return data as RefreshTokenData;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError('Token expired');
      }

      throw new InvalidTokenError('Invalid token');
    }
  }
}

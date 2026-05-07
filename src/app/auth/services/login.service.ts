import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { BadRequestError } from '@infra/common/errors/bad-request.error';
import { UnauthorizedError } from '@infra/common/errors/unauthorized.error';
import { SecurityService } from '@infra/domain/security/security.service';
import { CreateSessionService } from '@app/session/services/create-session.service';
import { FindSessionService } from '@app/session/services/find-session.service';
import { DeleteSessionService } from '@app/session/services/delete-session.service';
import { FindUserService } from '@app/user/services/find-user.service';
import { IAuthLoginDto } from '../dtos/auth-login.dto';
import { userWithPasswordSelector } from '@infra/database/repositories/selectors/user.selectors';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly security: SecurityService,
    private readonly findUser: FindUserService,
    private readonly findSession: FindSessionService,
    private readonly createSession: CreateSessionService,
    private readonly deleteSession: DeleteSessionService,
  ) {}

  async execute({ email, password }: IAuthLoginDto) {
    try {
      const user = await this.findUser.byEmail(email, userWithPasswordSelector);
      if (!user) {
        throw new BadRequestError({
          module: 'Auth',
          code: 'S.ALS.01',
          message: 'Usuário ou senha inválidos.',
        });
      } else if (user.isSuspended()) {
        throw new UnauthorizedError({
          module: 'Auth',
          code: 'S.ALS.02',
          message: 'Usuário suspenso.',
        });
      } else if (!user.isActive()) {
        throw new UnauthorizedError({
          module: 'Auth',
          code: 'S.ALS.03',
          message: 'Usuário desativado.',
        });
      }

      const session = await this.findSession.byUserEmail(email);
      if (session) {
        await this.deleteSession.execute(session.id);
      }

      const isValidPassword = await this.security.comparePassword(
        password,
        user.password,
      );

      if (!isValidPassword) {
        throw new BadRequestError({
          module: 'Auth',
          code: 'S.ALS.04',
          message: 'Usuário ou senha inválidos.',
        });
      }

      const { accessToken, expiresAt } = this.security.generateAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      });

      const { refreshToken } = this.security.generateRefreshToken(accessToken);

      return this.createSession.execute({
        email,
        expiresAt,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestError({
          module: 'Auth',
          code: 'S.ALS.05',
          message: 'Usuário ou senha inválidos.',
        });
      }

      throw error;
    }
  }
}

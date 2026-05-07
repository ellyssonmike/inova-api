import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from '@infra/common/errors/unauthorized.error';
import { SessionExpiredError } from '@app/session/errors/session-expired.error';
import { SecurityService } from '@infra/domain/security/security.service';
import { FindSessionService } from '@app/session/services/find-session.service';
import { CreateSessionService } from '@app/session/services/create-session.service';
import { DeleteSessionService } from '@app/session/services/delete-session.service';
import { AuthRefreshDto } from '@api/auth/dtos/auth-refresh.dto';

@Injectable()
export class AuthRefreshService {
  constructor(
    private readonly security: SecurityService,
    private readonly findSession: FindSessionService,
    private readonly createSession: CreateSessionService,
    private readonly deleteSession: DeleteSessionService,
  ) {}

  async execute(data: AuthRefreshDto) {
    const session = await this.findSession.byRefreshToken(data.refreshToken);
    if (!session) {
      throw new UnauthorizedError({
        module: 'Auth',
        code: 'S.ARS.01',
        message: 'Sessão inválida.',
        logout: true,
      });
    }

    const { exp, sub } = this.security.decodeRefreshToken(data.refreshToken);
    if (sub !== session.user.id) {
      throw new UnauthorizedError({
        module: 'Auth',
        code: 'S.ARS.02',
        message: 'Sessão inválida.',
        logout: true,
      });
    } else if (session.user.isSuspended()) {
      throw new UnauthorizedError({
        module: 'Auth',
        code: 'S.ARS.03',
        message: 'Usuário suspenso.',
        logout: true,
      });
    } else if (!session.user.isActive()) {
      throw new UnauthorizedError({
        module: 'Auth',
        code: 'S.ARS.04',
        message: 'Usuário desativado.',
        logout: true,
      });
    } else if (new Date(exp * 1000) < new Date()) {
      throw new SessionExpiredError({
        module: 'Auth',
        code: 'S.ARS.05',
        message: 'Sessão expirada.',
        expiredAt: new Date(exp * 1000),
        logout: true,
      });
    }

    const { accessToken, expiresAt } = this.security.generateAccessToken({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      status: session.user.status,
    });

    const { refreshToken } = this.security.generateRefreshToken(accessToken);

    await this.deleteSession.execute(session.id);
    const newSession = await this.createSession.execute({
      email: session.user.email,
      accessToken,
      refreshToken,
      expiresAt,
    });

    return newSession;
  }
}

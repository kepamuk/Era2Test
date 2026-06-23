import type { AuthSessionDto, AuthUserDto } from "./auth.dto";

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  credits: number;
}

export interface AuthSession {
  user: AuthUser;
  accessToken?: string;
}

export function mapAuthUserDto(dto: AuthUserDto): AuthUser {
  return {
    id: dto.id,
    name: dto.display_name,
    email: dto.email,
    credits: dto.credits,
  };
}

export function mapAuthSessionDto(dto: AuthSessionDto): AuthSession {
  return {
    user: mapAuthUserDto(dto.user),
    accessToken: dto.access_token,
  };
}

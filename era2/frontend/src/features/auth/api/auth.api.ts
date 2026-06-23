import { httpClient } from "@/shared/api";
import type { AuthSessionDto, LoginRequestDto, RegisterRequestDto } from "./auth.dto";
import { mapAuthSessionDto, type AuthSession } from "./auth.mapper";

const AUTH_ENDPOINTS = {
  me: "/api/auth/me",
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
} as const;

const TEMPORARY_MOCK_SESSION: AuthSession = {
  user: {
    id: "temporary-user",
    name: "User",
    credits: 1000,
  },
};

export async function getCurrentUser(): Promise<AuthSession | null> {
  return httpClient
    .get<AuthSessionDto>(AUTH_ENDPOINTS.me)
    .then(mapAuthSessionDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/auth/me is available.
      return null;
    });
}

export async function login(input: LoginRequestDto): Promise<AuthSession> {
  return httpClient
    .post<AuthSessionDto, LoginRequestDto>(AUTH_ENDPOINTS.login, input)
    .then(mapAuthSessionDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/auth/login is available.
      return TEMPORARY_MOCK_SESSION;
    });
}

export async function register(input: RegisterRequestDto): Promise<AuthSession> {
  return httpClient
    .post<AuthSessionDto, RegisterRequestDto>(AUTH_ENDPOINTS.register, input)
    .then(mapAuthSessionDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/auth/register is available.
      return TEMPORARY_MOCK_SESSION;
    });
}

export async function logout(): Promise<void> {
  return httpClient.post<void>(AUTH_ENDPOINTS.logout).catch(() => {
    // TODO(backend): Temporary fallback until /api/auth/logout is available.
  });
}

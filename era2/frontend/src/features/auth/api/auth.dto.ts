export interface AuthUserDto {
  id: string;
  display_name: string;
  email?: string;
  credits: number;
}

export interface AuthSessionDto {
  user: AuthUserDto;
  access_token?: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  display_name?: string;
}

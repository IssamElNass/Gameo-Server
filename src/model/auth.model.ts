export interface AuthRegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface PayloadDTO {
  username: string;
  userId: string;
}

export interface AuthSignInDTO {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

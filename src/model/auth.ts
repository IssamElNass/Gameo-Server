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
  username: string;
  password: string;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}

export interface UserRegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface User {
  userId: Number;
  username: String;
  email: String;
  password: String;
}

export interface UserRegisterDTO {
  username: String;
  email: String;
  password: String;
}

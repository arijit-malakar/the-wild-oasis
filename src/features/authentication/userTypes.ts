export interface UserType {
  fullName: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: string;
}

export interface PasswordUpdateType {
  passwordCurrent: string;
  passwordNew: string;
  passwordConfirm: string;
}

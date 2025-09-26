export interface LoginType {
  email: string;
  password: string;
}

export interface UserType extends LoginType {
  fullName: string;
}

export interface UserMetadata extends UserType {
  avatar: string;
}

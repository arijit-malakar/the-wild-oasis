import {
  PasswordUpdateType,
  UserType,
} from "../features/authentication/userTypes";

export const signup = async ({
  fullName,
  email,
  password,
  passwordConfirm,
}: UserType) => {
  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      passwordConfirm,
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message);

  return body.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message);

  return body.data;
};

export const getLoggedInUser = async () => {
  const res = await fetch("/api/users/me");
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);

  return body.data;
};

export const logout = async () => {
  const res = await fetch("/api/users/logout");
  const body = await res.json();
  return body;
};

export const updateUserData = async ({
  fullName,
  photo,
}: {
  fullName: string;
  photo: File | null;
}) => {
  const formData = new FormData();
  formData.append("fullName", fullName);
  if (photo) {
    formData.append("photo", photo);
  }
  const res = await fetch("/api/users/updateUser", {
    method: "PATCH",
    body: formData,
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message);

  return body.data;
};



// frontend\src\lib\auth.ts
import api from "./api";
import { LoginCredentials, OTPVerification, CreateUserFormData, UpdateUserFormData } from "@/types";

// Auth APIs
export const loginUser = (credentials: LoginCredentials) => {
  return api.post("/auth/login", credentials);
};

export const verifyOtp = (data: OTPVerification) => {
  return api.post("/auth/verify-otp", data);
};

// Admin APIs
export const getUsers = () => {
  return api.get("/admin/users");
};

export const createUser = (userData: CreateUserFormData) => {
  const formData = new FormData();
  formData.append("first_name", userData.first_name);
  formData.append("last_name", userData.last_name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("mobile_number", userData.mobile_number);
  if (userData.profile_picture && userData.profile_picture.length > 0) {
    formData.append("profile_picture", userData.profile_picture[0]);
  }

  return api.post("/admin/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUser = (userId: number, userData: UpdateUserFormData) => {
  return api.put(`/admin/users/${userId}`, userData);
};

export const deleteUser = (userId: number) => {
  return api.delete(`/admin/users/${userId}`);
};


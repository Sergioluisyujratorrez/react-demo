import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// ───────────────────────────────────────────────────────────────────────────
// LOGIN LOCAL (MOCK) — solo para desarrollar la plantilla.
// Entra con  admin@demo.com / demo  SIN backend ni internet.
// Para conectar tu API real: borra el bloque mock de abajo y descomenta la
// versión con `axios` que quedó anotada dentro de cada función.
// ───────────────────────────────────────────────────────────────────────────
const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "demo";

const DEMO_USER: UserModel = {
  id: 1,
  username: "admin",
  password: undefined,
  email: DEMO_EMAIL,
  first_name: "Admin",
  last_name: "Demo",
  fullname: "Admin Demo",
  roles: [1],
  pic: "media/avatars/300-1.jpg",
  language: "es",
};

// Server should return AuthModel
export async function login(email: string, password: string): Promise<{ data: AuthModel }> {
  // --- MOCK local ---
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return { data: { api_token: "demo-local-token" } };
  }
  throw new Error("The login details are incorrect");

  // --- API real (descomentar y borrar el mock de arriba) ---
  // return axios.post<AuthModel>(LOGIN_URL, { email, password });
}

export async function getUserByToken(_token: string): Promise<{ data: UserModel }> {
  // --- MOCK local ---
  return { data: DEMO_USER };

  // --- API real (descomentar y borrar el mock de arriba) ---
  // return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, { api_token: _token });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

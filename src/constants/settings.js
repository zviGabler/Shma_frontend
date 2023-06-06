export const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://localhost:3000`

export const API_URL = `${BASE_BACKEND_URL}/api/v1`;

export const TOKEN_NAME = 'auth_token';

export const endpoints = {
    users:"/users",
    login:"/login",
    signup:"/signup"
}
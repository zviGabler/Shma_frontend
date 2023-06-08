import { TOKEN_NAME } from "../../../constants/settings";

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const isTokenExpired = (token) => {
  const tokenPayload = parseJwt(token);
  const expiryDate = new Date(tokenPayload.exp * 1000);
  const now = new Date();
  return now.getTime() > expiryDate.getTime();
};

export const getToken = () => localStorage.getItem(TOKEN_NAME);

export const setToken = (token) => localStorage.setItem(TOKEN_NAME, token);
import { decode } from "jwt-decode";

export const isTokenExpired = (token) => {
  const decodedToken = decode(token);
  return decodedToken.exp < Date.now() / 1000;
};

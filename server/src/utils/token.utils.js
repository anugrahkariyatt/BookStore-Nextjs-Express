import bcrypt from "bcrypt";

export const hashRefreshToken = async (token) => {
  return await bcrypt.hash(token, 10);
};

export const compareRefreshToken = async (token, hash) => {
  return await bcrypt.compare(token, hash);
};

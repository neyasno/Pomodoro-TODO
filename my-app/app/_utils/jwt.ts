import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || '319j9vhsd9he';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn : 1000 * 60 * 2 });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token' + error);
  }
};

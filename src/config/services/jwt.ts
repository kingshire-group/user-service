import config from '../env'
import jwt from 'jsonwebtoken';
import Logger from './logger';

export const sign = (data: any) => {
  const token = jwt.sign(data, config.auth.jwt.secret || '', {
    expiresIn: config.auth.jwt.expiryTime
  });
  return token;
};

export const verify = (token: any) => {
  return jwt.verify(token, config.auth.jwt.secret || '', { ignoreExpiration: false });
};

export const refreshSign = (uid: any) => {
  const token = jwt.sign({ uid: uid }, process.env.JWT_REFRESH_SECRET || '', {
    expiresIn: process.env.JWT_REFRESH_EXPIRES
  });
  return token;
};

export const refreshVerify = (token: any) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || '', {
    ignoreExpiration: false
  });
};

export const getToken = (req: any) => {
  let authorization = null;
  let token = null;
  if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.authorization) {
    authorization = req.authorization;
  } else if (req.headers) {
    authorization = req.headers.authorization;
  } else if (req.socket) {
    if (req.socket.handshake.query && req.socket.handshake.query.token) {
      return req.socket.handshake.query.token;
    }
    authorization = req.socket.handshake.headers.authorization;
  }
  if (authorization) {
    const tokens = authorization.split('Bearer ');
    if (Array.isArray(tokens) || tokens.length === 2) {
      token = tokens[1];
    }
  }
  return token;
};

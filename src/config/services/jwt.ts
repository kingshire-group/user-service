import config from '../env'
import jwt from 'jsonwebtoken';

const sign = (data: any) => {
  const token = jwt.sign(data, config.auth.jwt.access.secret || '', {
    expiresIn: config.auth.jwt.access.expiryTime
  });
  return token;
};

const verify = (token: any) => {
  return jwt.verify(token, config.auth.jwt.access.secret || '', { ignoreExpiration: false });
};

const refreshSign = (uid: any) => {
  const token = jwt.sign({ uid }, config.auth.jwt.refresh.secret || '', {
    expiresIn: config.auth.jwt.refresh.expiryTime
  });
  return token;
};

const refreshVerify = (token: any) => {
  return jwt.verify(token, config.auth.jwt.refresh.secret || '', {
    ignoreExpiration: false
  });
};

const getToken = (req: any) => {
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

export default{
  sign,
  verify,
  refreshSign,
  refreshVerify,
  getToken
}
import { jwt, Retort } from '../../config/services'
import refreshTokenService from '../refreshTokens/refreshToken.service'
import { IUserModel } from '../User/user.model'
import authService from './auth.service'
import { NextFunction, Request, Response } from 'express'

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    const ipAddress = req.ip;
    const result = await saveRefreshToken(token, ipAddress);
    return Retort.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

const saveRefreshToken = async (token: string, ipAddress: string) => {
  const refreshToken = await refreshTokenService.findOne({
    token: token
  });
  if (refreshToken) {
    const user = await userService.findById(refreshToken.user);
    const newToken = generateToken(user);
    const newRefreshToken = await generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    return { user, token: newToken, refreshToken: newRefreshToken.token };
  } else {
    throw new Error('The refresh token is invalid!');
  }
};

const generateToken = (user: IUserModel) => {
  return jwt.sign({
    uid: user._id,
    role: user.profile.role
  });
};

const generateRefreshToken = async (user: IUserModel, ipAddress: string) => {
  const refreshToken = jwt.refreshSign(user._id);
  // save the token
  return await refreshTokenService.create({
    user: user._id,
    token: refreshToken,
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
};

const setTokenCookie = (res: Response, token: string) => {
  const cookieOptions = {
    httpOnly: true
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  res.cookie('refreshToken', token, cookieOptions);
};
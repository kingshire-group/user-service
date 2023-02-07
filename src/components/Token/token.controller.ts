import { jwt } from '../../config/services'
import { Profile } from '../User/user.model'
import { CookieOptions, Response } from 'express'
import tokenDbCall from './token.dbCall'
import Logger from '../../config/services/logger'
import { IRefreshTokenModel } from './token.model'

const generateToken = (user: Profile) => 
  jwt.sign({ username: user.username, role: user.role })

const saveNewUserRefreshToken = async (refreshToken: string, userId: string, ipAddress: string) => {
  const findQuery = { user: userId }
  const tokenData = {
    token: refreshToken,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  }

  return await tokenDbCall.create({
    input: {
      ...findQuery, ...tokenData
    },
    findQuery
  })
}

const saveExistingUserRefreshToken = async (userId: string, ipAddress: string,
   refreshToken: string, cookieToken: string) => {
  const foundUserTokens = await tokenDbCall.findOne({ user: userId })
  var newRefreshTokensArray
    
  
  if(cookieToken) {
    const foundToken = foundUserTokens.refreshTokens.find((rt: IRefreshTokenModel) =>
      rt.token === cookieToken)

    if(!foundToken) { newRefreshTokensArray = [] }
    else{ 
      newRefreshTokensArray =
        foundUserTokens.refreshTokens
          .filter((rt: IRefreshTokenModel) => rt.token !== foundToken) 
    }
  }

  foundUserTokens.refreshTokens = [...newRefreshTokensArray, {
    token: refreshToken,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  }]

  return await foundUserTokens.save()
} 

const setTokenCookie = (res: Response, token: string) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
  res.cookie('refreshToken', token, cookieOptions)
}

const deleteTokenCookie = (res: Response) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }
  res.clearCookie('refreshToken', cookieOptions);
}



// export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.body.refreshToken || req.cookies.refreshToken;
//     const ipAddress = req.ip;
//     const result = await saveRefreshToken(token, ipAddress);
//     return Retort.success(res, result);
//   } catch (exception) {[
//     next(exception);
//   }
// };

// const saveRefreshToken = async (token: string, ipAddress: string) => {
//   const refreshToken = await refreshTokenService.findOne({
//     token: token
//   });
//   if (refreshToken) {
//     const user = await userService.findById(refreshToken.user);
//     const newToken = generateToken(user);
//     const newRefreshToken = await generateRefreshToken(user, ipAddress);
//     refreshToken.revoked = Date.now();
//     refreshToken.revokedByIp = ipAddress;
//     refreshToken.replacedByToken = newRefreshToken.token;
//     await refreshToken.save();
//     return { user, token: newToken, refreshToken: newRefreshToken.token };
//   } else {
//     throw new Error('The refresh token is invalid!');
//   }
// };

export default {
  generateToken,
  saveNewUserRefreshToken,
  setTokenCookie,
  deleteTokenCookie,
  saveExistingUserRefreshToken
}
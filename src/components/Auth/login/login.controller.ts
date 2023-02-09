import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { jwt, Retort } from "../../../config/services";
import Logger from "../../../config/services/logger";
import tokenController from "../../Token/token.controller";
import { IUserModel } from "../../User/user.model";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var newRefreshToken
    const cookiesRefreshToken = req.cookies.refreshToken
    const user = req.user as IUserModel
    const ipAddress = req.ip
    const token = tokenController.generateToken(user.profile)
    newRefreshToken = jwt.refreshSign(user._id)

    if(!req.isNewUser){
      await tokenController
        .saveExistingUserRefreshToken(user._id, ipAddress, newRefreshToken, cookiesRefreshToken)
    }else{
      await tokenController
        .saveNewUserRefreshToken(newRefreshToken, user._id, ipAddress)
    }

    tokenController.deleteTokenCookie(res)
    tokenController.setTokenCookie(res, newRefreshToken)
    Retort.success(res, { message: 'Sign successfull', token})
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}

export const authLocal =  
  (req: Request, res: Response, next: NextFunction) => 
    passport.authenticate('local', { session: false },
      (err: any, user: IUserModel, info: any) => {
        if (err) return next(err)
        
        if(!user) {
          return Retort.error(res,
            {
              code: 'Unauthorized',
              message: 'Your email or password is incorrect'
            },
            401
          )
        }
        req.user = user
        return next()
    })(req, res, next)
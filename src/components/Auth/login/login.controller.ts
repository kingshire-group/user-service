import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Retort } from "../../../config/services";
import Logger from "../../../config/services/logger";
import { IUserModel } from "../../User/user.model";
import { IUserAuthenticate } from "../auth.interface";
import { AuthService } from "../auth.service";


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserAuthenticate = req.body
    const ipAddress: string = req.ip
    
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
          Retort.error(res,
            {
              code: 'Unauthorized',
              message: 'Your email or password is incorrect'
            },
            401
          )
        }
        return next()
    })(req, res, next)
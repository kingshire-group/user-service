import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { Retort } from "../../../config/services"
import Logger from "../../../config/services/logger"
import UserModel, { IUserModel, Profile } from "../../User/user.model"
import { IUsernameCreation } from "../auth.interface"
import { AuthService } from "../auth.service"
import { SignupValidation } from "./signup.validation"
import { login } from "../login/login.controller"

const validate = new SignupValidation()

declare global {
  namespace Express {
    interface Request {
      isNewUser: boolean
    }
  }
}

export const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserModel = await saveUserProfile(req.body)
    Retort.success(res, { message: 'user created', profile: user.profile})
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}

export const createUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isNewUser = true
    const user: IUserModel = await saveUsername(req.body)
    req.user = user
    req.isNewUser = isNewUser
    login(req, res, next)
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}

const saveUserProfile = async (payload: Profile) => {
  try {
    const { value, error }: Joi.ValidationResult = validate.createUserSchema(payload)

    if(error){
      throw new Error(error.message)
    }
    const query: IUserModel | null = await UserModel.findOne({
      'profile.email': payload.email
    })
    if (query){
      throw new Error('This email already exists')
    }

    const user: IUserModel = new UserModel({ profile: value })
    const saved: IUserModel = await user.save()
    return saved
  } catch (error: any) {
    throw new Error(error)
  }
}

const saveUsername = async (payload: IUsernameCreation) => {
  try {
    const validator: Joi.ValidationResult = validate.createUsernameSchema(payload)
    if(validator.error){
      throw new Error(validator.error.message)
    }

    const user: IUserModel | null = await UserModel.findOne({
      'profile.email': payload.email
    })
    if (!user){
      throw new Error('user not found!')
    }

    user.profile.username = payload.username
    const updated: IUserModel = await user.save()
    return updated
  } catch (error: any) {
    Logger.info(error)
    throw new Error(error)
  }
}
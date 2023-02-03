import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { Retort } from "../../../config/services"
import Logger from "../../../config/services/logger"
import UserModel, { IUserModel, Profile } from "../../User/user.model"
import { IUsernameCreation } from "../auth.interface"
import { AuthService } from "../auth.service"
import { SignupValidation } from "./signup.validation"

const validate = new SignupValidation()
const authServiceInstance = new AuthService()

export const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserModel = await saveUser(req.body)
    Retort.success(res, { message: 'user created', profile: user.profile})
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}

export const createUsername =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserModel = await saveUsername(req.body)
    const token: string = authServiceInstance.generateToken(user.profile)
    Retort.success(res, { message: 'Sign successfull', token})
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}

const saveUser = async (payload: Profile) => {
  try {
    const { value, error }: Joi.ValidationResult = validate.createUserSchema(payload)

    if(error){
      throw new Error(error.message)
    }
    const query: IUserModel | null = await UserModel.findOne({
      email: payload.email
    })
    if (query){
      throw new Error('This email already exists')
    }

    const user: IUserModel = new UserModel(value)
    const saved: IUserModel = await user.save()
    return saved
  } catch (error: any) {
    throw new Error(error)
  }
}

const saveUsername = async (payload: IUsernameCreation) => {
  try {
    const validator: Joi.ValidationResult = validate.createUsernameSchema(payload.username)
    if(validator.error){
      throw new Error(validator.error.message)
    }

    const user: IUserModel | null = await UserModel.findOne({
      email: payload.email
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
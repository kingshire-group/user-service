import Joi from "joi";
import Logger from "../../../config/services/logger";
import UserModel, { IUserModel, Profile, Services, Skills } from "../../User/model";
import { SignupValidation } from "./validation";

class Signup{
  validate: any

  constructor(){
    this.validate = new SignupValidation()
  }

  async createUser(payload: Profile){
    try {
      const { value, error }: Joi.ValidationResult = this.validate.createUser(payload)

      if(error){
        throw new Error(error.message)
      }
      const query: IUserModel | null = await UserModel.findOne({
        email: payload.email
      })
      if (query){
        throw new Error('This email already exists')
      }

      const user: IUserModel = new UserModel(payload)
      const saved: IUserModel = await user.save()
      return saved
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export { Signup }
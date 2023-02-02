import Joi from "joi";
import Logger from "../../../config/services/logger";
import { Profile } from "../../User/user.model";
import Validation from "../../validation";
import { 
  emailSchemaField,
  passwordSchemaField 
} from "../auth.validation";


export class LoginValidation extends Validation{
  constructor(){
    super()
  }

  authenticateUserSchema = (user: Profile): Joi.ValidationResult => {
    const schema: Joi.Schema = Joi.object().keys({
      ...emailSchemaField,
      ...passwordSchemaField,
    })
    return schema.validate(user)
  }
}
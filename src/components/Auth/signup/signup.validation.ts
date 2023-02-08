import Joi from "joi";
import Logger from "../../../config/services/logger";
import { Profile } from "../../User/user.model";
import Validation from "../../validation";
import { emailSchemaField, fullnameSchemaField, passwordSchemaField, usernameSchemaField } from "../auth.validation";


export class SignupValidation extends Validation{
  constructor(){
    super()
  }

  createUserSchema = (user: Profile): Joi.ValidationResult => {
    const schema: Joi.Schema = Joi.object().keys({
      ...fullnameSchemaField,
      ...emailSchemaField,
      ...passwordSchemaField,
      confirmpassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
    })
    return schema.validate(user)
  }

  createUsernameSchema = (username: string) : Joi.ValidationResult => {
    const schema: Joi.Schema = Joi.object().keys(usernameSchemaField)
    return schema.validate({ username })
  }
}
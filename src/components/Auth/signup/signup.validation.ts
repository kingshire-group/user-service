import Joi from "joi";
import Logger from "../../../config/services/logger";
import { Profile } from "../../User/user.model";
import Validation from "../../validation";
import { IUsernameCreation } from "../auth.interface";
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

  createUsernameSchema = (payload: IUsernameCreation) : Joi.ValidationResult => {
    const schema: Joi.Schema = Joi.object().keys({
      ...usernameSchemaField, ...emailSchemaField })
    return schema.validate(payload)
  }
}
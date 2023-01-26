import Joi from "joi";
import { Profile } from "../../User/model";
import Validation from "../../validation";

export class SignupValidation extends Validation{
  passwordMatcher: string

  constructor(){
    super()
    
    this.passwordMatcher = 
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
  }

  createUser(user: Profile): Joi.ValidationResult{
    const schema: Joi.Schema = Joi.object().keys({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().email({
        minDomainSegments: 2
      }),
      password: Joi.string()
        .pattern(new RegExp(this.passwordMatcher)).required(),
      confirmpassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
    })

    return schema.validate(user)
  }
}
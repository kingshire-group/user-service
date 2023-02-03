import Joi from "joi"

const passwordMatcher =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
const usernameMatcher =
      '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._£$€]+(?<![_.])$'

export const emailSchemaField = { 
	email: Joi.string()
	.email({minDomainSegments: 2}).required() } 
  
export const passwordSchemaField = { 
	password: Joi.string()
		.pattern(new RegExp(passwordMatcher)).required() } 

export const usernameSchemaField = { 
	username: Joi.string()
		.pattern(new RegExp(usernameMatcher)).required() }

export const fullnameSchemaField = { fullname: Joi.string().required() } 
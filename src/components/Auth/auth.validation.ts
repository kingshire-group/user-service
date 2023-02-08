import Joi from "joi"

const passwordMatcher =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
const usernameMatcher =
	'^(?=[a-zA-Z0-9._£$€]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'

export const emailSchemaField = { 
	email: Joi.string().trim()
	.email({minDomainSegments: 2}).required() } 
  
export const passwordSchemaField = { 
	password: Joi.string().trim()
		.pattern(new RegExp(passwordMatcher)).required() } 

export const usernameSchemaField = { 
	username: Joi.string().trim()
		.pattern(new RegExp(usernameMatcher)).required() }

export const fullnameSchemaField = {
	fullname: Joi.string().trim().min(5).required()
} 
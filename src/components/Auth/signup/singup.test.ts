// The signup is broken up into two steps
// 1. Create user profile
// This can be done via gmail or email
// a. using email:
// - This process takes: fullname, email, password and confirmpassword ✅ 
// - It should:
// -> return an error if the details passed do not pass the validation criteria
//~~~~~~ fullname is required and cannot be empty ✅
//~~~~~~ fullname should have a minimum of 5 characters ✅
//~~~~~~ username should be between 3 to 20 characters ✅
//~~~~~~ username cannot have two repeated underscore or dots ✅
//~~~~~~ username cannot have a dot followed by underscore or vice versa ✅
//~~~~~~ username cannot start or end with dot or underscore ✅
//~~~~~~ username can have two successive dot or underscore inbetween ✅
//~~~~~~ password should have at least one upper and lower case letter ✅
//~~~~~~ password should have at least one digit ✅
//~~~~~~ password should have at least one special character - #?!@$%^&*- ✅
//~~~~~~ password should be a minimum of 8 characters ✅
//~~~~~~ email should have an email format ✅

// -> return an error if the password and confirm password ✅
// -> return an error if the email passed is already saved in the database ✅

// b. using gmail
// -> It should:
// - if email is already in database and linked to googleauth
// -> login in the user as they already signed up
// - if email is already in database but is not linked to googleauth
// -> should return an error with user already exists
// - if user is not in the database
// -> should authenticate the user and signin

// 2. Create username
// It should return an error if the input does not meet the validation criteria ✅
// It should return an error if the user profile is not saved in the database ✅
// It should save and login if the details are valid ✅

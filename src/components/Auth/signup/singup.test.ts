// The signup is broken up into two steps
// 1. Create user profile
// This can be done via gmail or email
// a. using email:
// - This process takes: fullname, email, password and confirmpassword
// - It should:
// -> return an error if the details passed do not pass the validation criteria
// -> return an error if the passwords does not match the one saved in the database
// -> return an error is the email passed is already saved in the database
// -> save in the database if the validation is passed and details is not already in the database

// b. using gmail
// -> It should:
// - if email is already in database and linked to googleauth
// -> login in the user as they already signed up
// - if email is already in database but is not linked to googleauth
// -> should return an error with user already exists
// - if user is not in the database
// -> should authenticate the user and signin

// 2. Create username
// It should return an error if the input does not meet the validation criteria
// It should return an error if the user profile is not saved in the database
// It should save and login if the details are valid


// Access and Refersh Token
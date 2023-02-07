// There are two steps to logging in
// 1. using email/username
// - if email/username is not in the database 
// -> It should return an error for non existing user
// - if the password does not match
// -> It should return an error

// 2. using gmail
// - if email is not in the database,
// -> It should signup the user and login the user
// - if email is in the database, but isn't connected to google auth
// -> It should return an error with account already exists with these details
// - if the email is in the database and is googleauth
// -> It should login the user
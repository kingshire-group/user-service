// There are two steps to logging in
// 1. using email/username
// - return error if email/username is not in the database ✅ 
// - return error if the password does not match ✅

// 2. using gmail
// - if email is not in the database,
// -> It should signup the user and login the user
// - if email is in the database, but isn't connected to google auth
// -> It should return an error with account already exists with these details
// - if the email is in the database and is googleauth
// -> It should login the user

// Access and Refersh Token
// - when user logs in
// - if user has just signed up
// -> It should give the user an access token and refresh token
// - user already exists and is coming back
// -> It should give the user an access token and refresh token
// -> It should update the cookie refreshtoken to the new refresh token
// - validate the cookie refresh token
// - cookie refresh token is not in saved list of refresh tokens
// -> It should return delete all saved refresh tokens
// -> 

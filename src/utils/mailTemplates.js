
const passwordResetTemp = (token) => {
    return( `You have requested a password reset. Please click the following link to reset your password:
    <a href="http://localhost:5173/reset-password?token=${token}">Reset Password</a>`);
  
}


module.exports = {
    passwordResetTemp,
};
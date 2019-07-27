import route from "../misc/route"

import Profile from "../views/profile"
import Balance from "../views/balance"

// import auth view
import Login from "../views/auth/login"
import Register from "../views/auth/register"
import ForgotPassword from "../views/auth/forgotPassword"
import ResetPassword from "../views/auth/resetPassword"
import VerifyAccount from "../views/auth/verifyAccount"
import ResendVerifyEmail from "../views/auth/resendVerifyEmail"
import ChangePassword from '../views/auth/changePassword'
import Home from "../views/home"
import Casino from "../views/casino"
import SportsBet from "../views/sports"

import NotFound from "../views/notFound"

const META_AUTH_REQUIRED = {
    auth: true
};
export const router = {
    // not auth required
    home: route.register('/', 'Home', Home),
    sportsbet: route.register('/sports-betting', 'Sports Betting', SportsBet),
    login: route.register('/login', 'Login', Login),
    register: route.register('/register', 'Register', Register),
    verifyRegister: route.register('/verify-account', 'Verify Account', VerifyAccount),
    resendVerifyRegisterEmail: route.register('/register-resend-verify-email', 'Resend Verify Register Email', ResendVerifyEmail),
    forgotPassword: route.register('/forgot-password', 'Forgot Password', ForgotPassword),
    resetPassword: route.register('/reset-password/:code', 'Reset Password', ResetPassword),
    //auth required
    profile: route.register('/profile', 'Profile', Profile, META_AUTH_REQUIRED),
    balance: route.register('/balance', 'Balance', Balance, META_AUTH_REQUIRED),
    casino: route.register('/casino', 'Casino', Casino, META_AUTH_REQUIRED),
    changePassword: route.register('/change-password', 'Change password', ChangePassword, META_AUTH_REQUIRED),
    error404: route.register('/not-found', 'Not found', NotFound)
};

export default router
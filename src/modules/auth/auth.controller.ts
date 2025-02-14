import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../token';
import { userService } from '../user';
import * as authService from './auth.service';
import { emailService } from '../email';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response';


export const register = catchAsync(async (req: Request, res: Response) => {

  const user = await userService.registerUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
      sendSuccessResponse(res, httpStatus.CREATED, "user successfully Signed up", { user, tokens });

 // res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...userWithTokens });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
   console.log('Request Body:', req.body); // Log the request body
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, req.user.firstName);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query['token']);
  res.status(httpStatus.NO_CONTENT).send();
});



export const oauthSignin = catchAsync(async (req: Request, res: Response) => {
  try {
    // await userService.oauthSignup(req.user)
    const user = await userService.oauthSignup(req.body)
    const tokens = await tokenService.generateAuthTokens(user);
    const data = { user, tokens }


    sendSuccessResponse(res, httpStatus.OK, "user successfully Signed up", data);
  } catch (error: any) {
    sendErrorResponse(res, error.statusCode, error.message);
  }
});
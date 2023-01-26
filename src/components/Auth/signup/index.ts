import { NextFunction, Request, Response } from "express";
import { Retort } from "../../../config/services";
import Logger from "../../../config/services/logger";
import { IUserModel } from "../../User/model";
import { AuthService } from "../service";
import { Signup } from "./Signup";

const signupInstance = new Signup()
const authServiceInstance = new AuthService();
export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserModel = await signupInstance.createUser(req.body)
    const token: string = authServiceInstance.generateToken(user)
    Retort.success(res, { message: 'Sign in successfull', token })
  } catch (error: any) {
    Retort.error(res, { message: error.message }, error.code)
  }
}
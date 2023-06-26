import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModal from "../models/userModel";
import env from "../utils/validateEnv";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await UserModal.create(req.body);
    const token = jwt.sign({ id: newUser?._id }, env.JWT_SECRETE_KEY, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    res.cookie("authToken", token, {
      maxAge: env.JWT_EXPIRES_IN,
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req?.cookies?.authToken ?? null;

  if (!(typeof authToken === "string" && authToken !== "")) {
    res.status(401).json({
      status: "fail",
      statusCode: 401,
      data: null,
    });
  }

  // const decodedToken = jwt.verify(authToken, env.JWT_SECRETE_KEY);
  // console.log("Decoded Token", decodedToken);
  next();
};

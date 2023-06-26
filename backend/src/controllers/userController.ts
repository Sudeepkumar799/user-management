import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModal from "../models/userModel";
import env from "../utils/validateEnv";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModal.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req?.cookies?.authToken ?? null;
    if (typeof authToken === "string" && authToken !== "") {
      const tokenData = jwt.verify(
        authToken,
        env.JWT_SECRETE_KEY
      ) as JwtPayload;

      if (typeof tokenData?.id && tokenData?.id !== "") {
        const user = await UserModal.findById(tokenData.id).exec();
        res.status(200).json(user);
      } else {
        res.status(401).json({
          status: "fail",
          statusCode: 401,
          data: null,
        });
      }
    } else {
      res.status(401).json({
        status: "fail",
        statusCode: 401,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await UserModal.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const { name, emailId, role } = req.body;
    const updatedUser = await UserModal.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name,
          emailId,
          role,
        },
      },
      {
        new: true,
      }
    ).exec();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await UserModal.findByIdAndDelete({ _id: userId }).exec();
    res.status(200).send(`${user?.name} has been removed`);
  } catch (error) {
    next(error);
  }
};

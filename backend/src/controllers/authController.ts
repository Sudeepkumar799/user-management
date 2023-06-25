import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModal from "../models/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await UserModal.create(req.body);
    const token = jwt.sign({ id: newUser?._id }, "9r!w85u-Yn7W#sK", {
      expiresIn: 1000 * 60 * 15,
    });

    res.cookie("authToken", token, {
      maxAge: 1000 * 60 * 15,
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

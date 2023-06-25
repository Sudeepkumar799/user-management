import { Request, Response, NextFunction } from "express";
import UserModal from "../models/userMondel";

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

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await UserModal.findById(userId).exec();
    res.status(200).json(user);
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

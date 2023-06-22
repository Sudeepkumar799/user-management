import { Request, Response, NextFunction } from "express";
import UserModal from "../models/user";

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
    const { firstName, lastName, mobileNumber, emailId, role } = req.body;
    const newUser = await UserModal.create({
      firstName,
      lastName,
      mobileNumber,
      emailId,
      role,
    });
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
    const { firstName, lastName, mobileNumber, emailId, role } = req.body;
    const updatedUser = await UserModal.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName,
          lastName,
          mobileNumber,
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
    res.status(200).send(`${user?.firstName} has been removed`);
  } catch (error) {
    next(error);
  }
};

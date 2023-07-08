export interface UserModel {
  _id: string;
  name: string;
  emailId: string;
  mobileNumber: null | number;
  role: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type UsersModel = ReadonlyArray<UserModel>;

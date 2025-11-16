import { IUser } from "../../common/interfaces/user.interface";

export type IGetUsersResp = Array<IUser>;

export interface IUserCreate {
  full_name: string;
  email: string;
  role_id: string;
}

export interface IUserUpdate {
  full_name?: string;
  email?: string;
  role_id?: string;
}

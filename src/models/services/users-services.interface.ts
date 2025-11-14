import { IUser } from "../../common/interfaces/user.interface";

export type IGetUsersResp = Array<IUser>;

export interface IUserCreate {
  name: string;
  email: string;
  role_id: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  role_id?: string;
}

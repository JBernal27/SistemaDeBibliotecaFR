import { IUser } from "../interfaces/user.interface";

export interface IGetUserByIdReq {
  id: string;
}

export type IGetUsersResp = Array<IUser[]>

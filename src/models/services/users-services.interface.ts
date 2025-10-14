import { ApiResponse } from "../api";
import { IUser } from "../interfaces/user.interface";

export interface IGetUserByIdReq {
  id: string;
}

export interface IGetUsersResp extends ApiResponse<IUser[]> {}

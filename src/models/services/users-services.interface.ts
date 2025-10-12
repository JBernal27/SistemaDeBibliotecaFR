import { ApiResponse } from "../api";
import { IUser } from "../interfaces/user.interface";

export interface IGetUserById{}

export interface IGetUserByIdResp extends ApiResponse<IGetUserById> { //Respuesta Esperada
    statusCode: number;
    message: string;
    data: IUser;
  }

  export interface IGetUserByIdReq { //Requerimiento Esperado
    id: string;
  }
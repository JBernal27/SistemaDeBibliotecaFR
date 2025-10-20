import { ILogin } from "../interfaces/login.interface";

export interface ILoginReq {
    email:    string;
    password: string;
}

export type ILoginResp = ILogin

export interface IRegisterReq {
    full_name:     string;
    email:    string;
    password: string;
}

export type IRegisterResp = ILogin
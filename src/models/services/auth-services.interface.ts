import { ILogin } from "../interfaces/login.interface";

export interface ILoginReq {
    email:    string;
    password: string;
}

export interface ILoginResp extends ILogin {}

export interface IRegisterReq {
    full_name:     string;
    email:    string;
    password: string;
}

export interface IRegisterResp extends ILogin {}
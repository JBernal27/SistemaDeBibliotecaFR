import { IMaterial } from "../../common/interfaces/material.interface";

export type IGetMaterialsResp = Array<IMaterial>

export interface IMaterialCreate {
  title: string;
  author: string;
  type: string;
}

export interface IMaterialUpdate {
  title?: string;
  author?: string;
  type?: string;
}

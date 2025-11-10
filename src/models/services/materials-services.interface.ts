import { IMaterial } from "../../common/interfaces/material.interface";

export type IGetMaterialsResp = Array<IMaterial>;

export interface IMaterialCreate {
  title: string;
  author_id: string;
  type_id: string;
  img?: string | null; // URL to the image
}

export interface IMaterialUpdate {
  title?: string;
  author_id?: string;
  type_id?: string;
  img?: string | null;
}

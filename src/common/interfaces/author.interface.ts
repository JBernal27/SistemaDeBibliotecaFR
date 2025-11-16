import { IMaterialMini } from "./material.interface";

export interface IAuthor {
  name:        string;
  nationality: string;
  birth_date:  Date;
  death_date:  null | Date;
  biography:   null | string;
  id:          string;
  created_by:  null  | string;
  updated_by:  null | string;
  updated_at:  Date;
  materials:   IMaterialMini[];
}

export interface IAuthorMini {
  id:          string;
  name:        string;
  nationality: string;
}

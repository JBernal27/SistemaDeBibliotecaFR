import { IAuthorMini } from "./author.interface";
import { IMaterialType } from "./matertialType.interface";

export interface IMaterial {
  title:         string;
  author_id:     string;
  type_id:       string;
  img:           string;
  id:            string;
  is_deleted:    boolean;
  date_added:    Date;
  created_by:    string;
  updated_by:    string;
  updated_at:    Date;
  author:        IAuthorMini;
  material_type: IMaterialType;
}

export interface IMaterialMini {
  id:         string;
  title:      string;
  img:        string | null;
  updated_at: Date;
}

import { IAuthor } from "../../common/interfaces/author.interface";

export type IGetAuthorsResp = Array<IAuthor>;

export interface IAuthorReq {
  name: string;
  nationality?: string | null;
  birth_date?: Date | string | null;
  death_date?: Date | string | null;
  biography?: string | null;
}
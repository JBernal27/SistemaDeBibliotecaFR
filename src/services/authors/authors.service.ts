import { axiosInstance } from "../../axios.config";
import { IAuthor } from "../../common/interfaces/author.interface";
import {
  IGetAuthorsResp,
  IAuthorReq
} from "../../models/services/authors-services.interface";
import { AUTHORS_API_ENDPOINTS, TAuthorEndpointKeys } from "./authors.endpoints";

const getEndpoint = (method: TAuthorEndpointKeys, id: string = ""): string => {
  return AUTHORS_API_ENDPOINTS(id)[method];
};

export class AuthorsService {
  static getAll = async (params?: { query?: string | null }): Promise<IGetAuthorsResp> => {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetAuthorsResp>(endpoint, { params });
    return response.data;
  };

  static getById = async (id: string): Promise<IAuthor> => {
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<IAuthor>(endpoint);
    return response.data;
  };

  static create = async (data: IAuthorReq): Promise<IAuthor> => {
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<IAuthor>(endpoint, data);
    return response.data;
  };

  static update = async (id: string, data: Partial<IAuthorReq>): Promise<IAuthor> => {
    const endpoint = getEndpoint("UPDATE", id);
    const response = await axiosInstance.put<IAuthor>(endpoint, data);
    return response.data;
  };

  static delete = async (id: string): Promise<void> => {
    const endpoint = getEndpoint("DELETE", id);
    await axiosInstance.delete(endpoint);
  };
}

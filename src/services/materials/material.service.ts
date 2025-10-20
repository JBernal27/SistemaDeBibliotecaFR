import { axiosInstance } from "../../axios.config";
import { IMaterial } from "../../common/interfaces/material.interface";
import {
  IGetMaterialsResp,
  IMaterialCreate,
  IMaterialUpdate,
} from "../../models/services/materials-services.interface";
import { MATERIALS_API_ENDPOINTS, TMaterialEndpointKeys } from "./material.endpoints";

const getEndpoint = (method: TMaterialEndpointKeys, id: string = ""): string => {
  return MATERIALS_API_ENDPOINTS(id)[method];
};

export class MaterialsService {

  static getAll = async (params?: {
    type_id?: string;
    availability_id?: string;
    query?: string;
  }): Promise<IGetMaterialsResp> => {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetMaterialsResp>(endpoint, { params });
    return response.data;
  };

  static getById = async (id: string): Promise<IMaterial> => {
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<IMaterial>(endpoint);
    return response.data;
  };

  static getByAuthor = async (author: string): Promise<IMaterial[]> => {
    const endpoint = getEndpoint("GET_BY_AUTHOR", author);
    const response = await axiosInstance.get<IMaterial[]>(endpoint);
    return response.data;
  };

  static create = async (data: IMaterialCreate): Promise<IMaterial> => {
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<IMaterial>(endpoint, data);
    return response.data;
  };

  static update = async (id: string, data: IMaterialUpdate): Promise<IMaterial> => {
    const endpoint = getEndpoint("UPDATE", id);
    const response = await axiosInstance.put<IMaterial>(endpoint, data);
    return response.data;
  };

  static delete = async (id: string): Promise<void> => {
    const endpoint = getEndpoint("DELETE", id);
    await axiosInstance.delete(endpoint);
  };
}

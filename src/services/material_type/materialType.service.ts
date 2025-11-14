import { axiosInstance } from "../../axios.config";
import { IMaterialType } from "../../common/interfaces/matertialType.interface";
import { IGetMaterialTypesResp } from "../../models/services/materialType-services.interface";
import { MATERIAL_TYPE_API_ENDPOINTS, TMaterialTypeEndpointKeys } from "./materialType.endpoints";

const getEndpoint = (method: TMaterialTypeEndpointKeys, id: string = ""): string => {
  return MATERIAL_TYPE_API_ENDPOINTS(id)[method];
};

export class MaterialTypeService {
  static getAll = async (): Promise<IGetMaterialTypesResp> => {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetMaterialTypesResp>(endpoint);
    return response.data;
  };

  static getById = async (id: string): Promise<IMaterialType> => {
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<IMaterialType>(endpoint);
    return response.data;
  };

  static create = async (data: { name?: string; description?: string }): Promise<IMaterialType> => {
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<IMaterialType>(endpoint, data);
    return response.data;
  };

  static update = async (id: string, data: { name?: string; description?: string }): Promise<IMaterialType> => {
    const endpoint = getEndpoint("UPDATE", id);
    const response = await axiosInstance.put<IMaterialType>(endpoint, data);
    return response.data;
  };

  static delete = async (id: string): Promise<void> => {
    const endpoint = getEndpoint("DELETE", id);
    await axiosInstance.delete(endpoint);
  };
}

import { axiosInstance } from "../../axios.config";
import { IMaterial } from "../../common/interfaces/material.interface";
import {
  IMaterialCreate,
  IMaterialUpdate,
} from "../../models/services/materials-services.interface";
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

  static getById = async (id: string): Promise<IMaterial> => { //! Revisar tipo de retorno
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<IMaterial>(endpoint);
    return response.data;
  };

  static create = async (data: IMaterialCreate): Promise<IMaterial> => { //! Revisar tipo de retorno
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<IMaterial>(endpoint, data);
    return response.data;
  };

  static update = async (id: string, data: IMaterialUpdate): Promise<IMaterial> => { //! Revisar tipo de retorno
    const endpoint = getEndpoint("UPDATE", id);
    const response = await axiosInstance.put<IMaterial>(endpoint, data);
    return response.data;
  };

  static delete = async (id: string): Promise<void> => {
    const endpoint = getEndpoint("DELETE", id);
    await axiosInstance.delete(endpoint);
  };
}

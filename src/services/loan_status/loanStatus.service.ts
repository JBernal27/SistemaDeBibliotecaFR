import { axiosInstance } from "../../axios.config";
import { IMaterial } from "../../common/interfaces/material.interface";
import { IGetLoanStatusResp } from "../../models/services/loanStatus-services.interfaces";
import {
  IMaterialCreate,
  IMaterialUpdate,
} from "../../models/services/materials-services.interface";
import { LOAN_STATUS_API_ENDPOINTS, TLoanStatusEndpointKeys } from "./loanStatus.endpoints";


const getEndpoint = (method: TLoanStatusEndpointKeys, id: string = ""): string => {
  return LOAN_STATUS_API_ENDPOINTS(id)[method];
};

export class LoanStatusService {

  static getAll = async (): Promise<IGetLoanStatusResp> => {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetLoanStatusResp>(endpoint);
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

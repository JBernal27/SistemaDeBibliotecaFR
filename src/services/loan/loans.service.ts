import { axiosInstance } from "../../axios.config";
import { ILoan } from "../../common/interfaces/loan.interface";
import {
  IGetLoansResp,
  ILoanReq
} from "../../models/services/loans-services.interface";
import { LOANS_API_ENDPOINTS, TLoanEndpointKeys } from "./loans.endpoints";

const getEndpoint = (method: TLoanEndpointKeys, id: string = "", userId: string = ""): string => {
  return LOANS_API_ENDPOINTS(id, userId)[method];
};

export class LoansService {
  static getAll = async (params?: { query?: string | null }): Promise<IGetLoansResp> => {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetLoansResp>(endpoint, { params });
    return response.data;
  };

  static getById = async (id: string): Promise<ILoan> => {
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<ILoan>(endpoint);
    return response.data;
  };

  static getByUser = async (userId: string): Promise<IGetLoansResp> => {
    const endpoint = getEndpoint("GET_BY_USER", "", userId);
    const response = await axiosInstance.get<IGetLoansResp>(endpoint);
    return response.data;
  };

  static create = async (data: ILoanReq): Promise<ILoan> => {
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<ILoan>(endpoint, data);
    return response.data;
  };

  static returnLoan = async (id: string): Promise<ILoan> => {
    const endpoint = getEndpoint("RETURN", id);
    const response = await axiosInstance.put<ILoan>(endpoint);
    return response.data;
  };
}

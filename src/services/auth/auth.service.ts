import { axiosInstance } from "../../axios.config";
import { ILoginReq, ILoginResp, IRegisterReq, IRegisterResp } from "../../models/services/auth-services.interface";
import { TEndpointKeys, AUTH_API_ENDPOINTS } from "./auth.endpoints";

const getEndpoint = (method: TEndpointKeys): string => {
  return AUTH_API_ENDPOINTS()[method];
};

export class AuthService {
  static login = async (data: ILoginReq): Promise<ILoginResp> => {
    const endpoint = getEndpoint("LOGIN");

    const response = await axiosInstance.post<ILoginResp>(endpoint, data);
    return response.data;
  };

  static register = async (data: IRegisterReq): Promise<IRegisterResp> => {
    const endpoint = getEndpoint("REGISTER");

    const response = await axiosInstance.post<IRegisterResp>(endpoint, data);
    return response.data;
  };
}

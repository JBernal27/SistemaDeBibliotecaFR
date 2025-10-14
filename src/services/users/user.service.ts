import { axiosInstance } from "../../axios.config";
import { IGetUsersResp } from "../../models/services/users-services.interface";
import { TEndpointKeys, USERS_API_ENDPOINTS } from "./users.endpoints";

const getEndpoint = (method: TEndpointKeys, id: string = ""): string => {
  return USERS_API_ENDPOINTS(id)[method];
};

export class UsersService {
  static getById = async (): Promise<IGetUsersResp> => {
    const endpoint = getEndpoint("GET_ALL");

    const response = await axiosInstance.get<IGetUsersResp>(endpoint);
    return response.data;
  };
}

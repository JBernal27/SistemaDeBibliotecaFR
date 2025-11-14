import { axiosInstance } from "../../axios.config";
import { IUser } from "../../common/interfaces/user.interface";
import {
  IGetUsersResp,
  IUserCreate,
  IUserUpdate,
} from "../../models/services/users-services.interface";
import {
  USERS_API_ENDPOINTS,
  TUserEndpointKeys,
} from "./users.endpoints";

const getEndpoint = (method: TUserEndpointKeys, id: string = ""): string => {
  return USERS_API_ENDPOINTS(id)[method];
};

export class UsersService {
  static async getAll(params?: { role_id?: string | null; query?: string | null }): Promise<IGetUsersResp> {
    const endpoint = getEndpoint("GET_ALL");
    const response = await axiosInstance.get<IGetUsersResp>(endpoint, { params });
    return response.data;
  }

  static async getById(id: string): Promise<IUser> {
    const endpoint = getEndpoint("GET_BY_ID", id);
    const response = await axiosInstance.get<IUser>(endpoint);
    return response.data;
  }

  static async create(data: IUserCreate): Promise<IUser> {
    const endpoint = getEndpoint("CREATE");
    const response = await axiosInstance.post<IUser>(endpoint, data);
    return response.data;
  }

  static async update(id: string, data: IUserUpdate): Promise<IUser> {
    const endpoint = getEndpoint("UPDATE", id);
    const response = await axiosInstance.put<IUser>(endpoint, data);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    const endpoint = getEndpoint("DELETE", id);
    await axiosInstance.delete(endpoint);
  }
}

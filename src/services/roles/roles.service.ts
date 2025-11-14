import { axiosInstance } from "../../axios.config";
import { IRole } from "../../common/interfaces/role.interface";
import { RolesEndpoints } from "./roles.endpoints";

export const RolesService = {
  async getAll(): Promise<IRole[]> {
    const response = await axiosInstance.get(RolesEndpoints.getAll);
    return response.data;
  },

  async getById(id: string): Promise<IRole> {
    const response = await axiosInstance.get(RolesEndpoints.getById(id));
    return response.data;
  },
};

import { axiosInstance } from "../../axios.config";
import { IRole } from "../../common/interfaces/role.interface";
import { RolesEndpoints } from "./roles.endpoints";

export const RolesService = {
  async getAll(): Promise<IRole[]> {
    const response = await axiosInstance.get<IRole[]>(RolesEndpoints.getAll);
    return response.data;
  },

  async getById(id: string): Promise<IRole> {
    const response = await axiosInstance.get<IRole>(RolesEndpoints.getById(id));
    return response.data;
  },

  async create(data: { name: string; description?: string }): Promise<IRole> {
    const response = await axiosInstance.post<IRole>(RolesEndpoints.base, data);
    return response.data;
  },

  async update(id: string, data: { name: string; description?: string }): Promise<IRole> {
    const response = await axiosInstance.put<IRole>(RolesEndpoints.getById(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(RolesEndpoints.getById(id));
  },
};

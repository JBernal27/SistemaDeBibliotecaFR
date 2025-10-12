
import { axiosInstance } from "../../axios.config";import { IGetUserByIdReq, IGetUserByIdResp } from "../../models/services/users-services.interface";
import { TEndpointKeys, USERS_API_ENDPOINTS } from "./users.endpoints";

// Función auxiliar que obtiene la URL del endpoint basado en el tipo de operación y un ID opcional
const getEndpoint = (method: TEndpointKeys, id: string = ""): string => {
  // USERS_API_ENDPOINTS es una función o objeto que devuelve la URL específica para cada operación
  return USERS_API_ENDPOINTS(id)[method];
};

// Clase principal que contiene los métodos para interactuar con la API de usuarios
export class UsersService {
  // Método para obtener un usuario por su ID sin manejo de errores
  static getById = async ({
    id,
  }: IGetUserByIdReq): Promise<IGetUserByIdResp> => {
    // Obtiene la URL específica del endpoint para obtener un usuario por ID
    const endpoint = getEndpoint("GET_BY_ID", id);

    // Realiza la solicitud GET a la API usando axiosInstance y devuelve directamente la respuesta
    const response = await axiosInstance.get<IGetUserByIdResp>(endpoint);
    return response.data;
  };
}
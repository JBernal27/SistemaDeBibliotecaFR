export const USERS_API_ENDPOINTS = (id: string = "") => {
  const resource = "/users";

  return {
    GET_ALL: resource,
    GET_BY_ID: `${resource}/${id}`,
    CREATE: resource,
    UPDATE: `${resource}/${id}`,
    DELETE: `${resource}/${id}`,
  };
};

export type TUserEndpointKeys =
  | "GET_ALL"
  | "GET_BY_ID"
  | "CREATE"
  | "UPDATE"
  | "DELETE";


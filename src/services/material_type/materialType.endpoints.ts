export const MATERIAL_TYPE_API_ENDPOINTS = (_id: string = "") => {
  const resource = "/material-types";

  return {
    GET_ALL: `${resource}`,
    GET_BY_ID: `${resource}/${_id}`,
    CREATE: `${resource}`,
    UPDATE: `${resource}/${_id}`,
    DELETE: `${resource}/${_id}`,
  };
};

export type TMaterialTypeEndpointKeys =
  | "GET_ALL"
  | "GET_BY_ID"
  | "CREATE"
  | "UPDATE"
  | "DELETE";

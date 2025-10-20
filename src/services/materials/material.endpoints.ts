export const MATERIALS_API_ENDPOINTS = (_id: string = "") => {
  const resource = "/materials";

  return {
    GET_ALL: `${resource}/`,
    GET_BY_ID: `${resource}/${_id}`,
    GET_BY_AUTHOR: `${resource}/by-author/${_id}`,
    CREATE: `${resource}`,
    UPDATE: `${resource}/${_id}`,
    DELETE: `${resource}/${_id}`,
  };
};

export type TMaterialEndpointKeys =
  | "GET_ALL"
  | "GET_BY_ID"
  | "GET_BY_AUTHOR"
  | "CREATE"
  | "UPDATE"
  | "DELETE";

export const USERS_API_ENDPOINTS = (_id: string = "") => {
  const resource = "/users";

  return {
    GET_ALL: `${resource}`,
    GET_BY_ID: `${resource}/${_id}`,
    UPDATE: `${resource}/${_id}`,
    DELETE: `${resource}`,
  };
};

export type TEndpointKeys = "GET_ALL" | "UPDATE" | "GET_BY_ID" | "DELETE";

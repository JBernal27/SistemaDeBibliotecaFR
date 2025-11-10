export const AUTHORS_API_ENDPOINTS = (_id: string = "") => {
  const resource = "/authors";

  return {
    GET_ALL: `${resource}/`,
    GET_BY_ID: `${resource}/${_id}`,
    CREATE: `${resource}`,
    UPDATE: `${resource}/${_id}`,
    DELETE: `${resource}/${_id}`,
  };
};

export type TAuthorEndpointKeys =
  | "GET_ALL"
  | "GET_BY_ID"
  | "CREATE"
  | "UPDATE"
  | "DELETE";

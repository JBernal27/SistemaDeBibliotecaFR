export const LOANS_API_ENDPOINTS = (_id: string = "", userId: string = "") => {
  const resource = "/loans";

  return {
    GET_ALL: `${resource}/`,
    GET_BY_ID: `${resource}/${_id}`,
    GET_BY_USER: `${resource}/user/${userId}`,
    CREATE: `${resource}`,
    RETURN: `${resource}/${_id}/return`,
  };
};

export type TLoanEndpointKeys =
  | "GET_ALL"
  | "GET_BY_ID"
  | "GET_BY_USER"
  | "CREATE"
  | "RETURN";

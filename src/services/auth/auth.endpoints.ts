export const AUTH_API_ENDPOINTS = () => {
  const resource = "/auth";

  return {
    LOGIN: `${resource}/login`,
    REGISTER: `${resource}/register`,
  };
};

export type TEndpointKeys = "LOGIN" | "REGISTER";

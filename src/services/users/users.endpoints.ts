//Se definen los endpoints de la API de usuarios y su estructura

export const USERS_API_ENDPOINTS = (_id: string = "") => {

    const resource = "/users";
    
    return {
      GET_ALL : `${resource}`,
      GET_BY_EMAIL: `${resource}`,
      GET_BY_ID : `${resource}/${_id}`,
      UPDATE : `${resource}/${_id}`,
      REGISTER : `${resource}/register`,
    };
  };
  
  export type TEndpointKeys = 'GET_ALL' | 'GET_BY_ID' | 'UPDATE' | 'GET_BY_EMAIL' | 'REGISTER'; 
  
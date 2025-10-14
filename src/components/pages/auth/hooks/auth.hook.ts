import { useState } from "react";
import {
  ILoginReq,
  IRegisterReq,
} from "../../../../models/services/auth-services.interface";
import { AuthService } from "../../../../services/auth/auth.service";
import AuthStorage from "../../../utilities/auth-storage.utility";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: ILoginReq) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(data);
      AuthStorage.setToken(response.token);
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Hubo un problema al conectarse. Intenta nuevamente o contacta al administrador.";
      console.log(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { login, loading, error, clearError };
};

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: IRegisterReq) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(data);
      if (response.error) {
        setError(response.message);
      }
      console.log("TOKEEEN" + response.token);
      AuthStorage.setToken(response.token);
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.detail ||
        "Error al registrarse. Intenta nuevamente o contacta al administrador.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { register, loading, error, clearError };
};

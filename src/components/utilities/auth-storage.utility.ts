import { jwtDecode } from "jwt-decode";
import { IPayload } from "../../common/interfaces/payload.interface";

class AuthStorage {
  private static readonly USER_KEY = "user_data";
  private static readonly TOKEN_KEY = "auth_token";

  /**
   * Obtiene el token almacenado
   */
  static getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error al obtener token de localStorage:", error);
      return null;
    }
  }

  /**
   * Guarda el token de autenticación y decodifica la información del usuario
   */
  static setToken(token: string): void {
    try {
      // Guardamos el token
      localStorage.setItem(this.TOKEN_KEY, token);

      // Intentamos decodificar el JWT
      const decoded = jwtDecode<IPayload>(token);

      // Guardamos la información del usuario decodificada
      localStorage.setItem(this.USER_KEY, JSON.stringify(decoded));
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      console.error("Error al guardar o decodificar token:", error);
    }
  }

  /**
   * Obtiene la información del usuario desde localStorage o decodifica el token si no existe
   */
  static getUser(): IPayload | null {
    try {
      const storedUser = localStorage.getItem(this.USER_KEY);
      if (storedUser) {
        return JSON.parse(storedUser) as IPayload;
      }

      // Si no existe user_data pero sí el token, lo decodificamos en caliente
      const token = this.getToken();
      if (token) {
        const decoded = jwtDecode<IPayload>(token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(decoded));
        return decoded;
      }

      return null;
    } catch (error) {
      console.error("Error al obtener usuario de localStorage:", error);
      return null;
    }
  }

  /**
   * Limpia toda la información de autenticación
   */
  static logout(): void {
    try {
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
  }

  /**
   * Verifica si el token ha expirado
   */
  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      if (!decoded.exp) return true;
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error al verificar expiración del token:", error);
      return true;
    }
  }
}

export default AuthStorage;

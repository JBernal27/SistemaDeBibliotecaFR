import { axiosInstance } from "../../axios.config";

export type LoanPoint = { date: string; count: number };
export type TypePoint = { material_type: string; description?: string | null; count: number };

const GraphicsService = {
  async getLoansByDate(days = 30): Promise<LoanPoint[]> {
    const resp = await axiosInstance.get<LoanPoint[]>("/graphics/loans-by-date", {
      params: { days },
    });
    return resp.data;
  },

  async getMaterialTypesBorrowed(days = 30): Promise<TypePoint[]> {
    const resp = await axiosInstance.get<TypePoint[]>(
      "/graphics/material-types-borrowed",
      { params: { days } }
    );
    return resp.data;
  },
};

export default GraphicsService;

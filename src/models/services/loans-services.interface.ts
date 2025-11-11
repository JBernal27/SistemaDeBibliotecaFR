import { ILoan } from "../../common/interfaces/loan.interface";


export type IGetLoansResp = Array<ILoan>;


export interface ILoanReq {
  material_id: string;
  user_id: string;
  expected_return_date: Date | string;
  status_id: string;
  actual_return_date?: Date | string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

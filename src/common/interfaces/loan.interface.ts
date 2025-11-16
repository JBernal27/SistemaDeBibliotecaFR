export interface ILoan {
  id: string;
  material_id: string;
  user_id: string;
  expected_return_date: Date;
  status_id: string;
  loan_date: Date;
  actual_return_date: Date | null;
  created_by: string | null;
  updated_by: string | null;
  updated_at: Date;

  
  material: any | null;
  user: any | null;
  status: any | null;
}

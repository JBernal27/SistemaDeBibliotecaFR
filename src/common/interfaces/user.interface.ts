export interface IUser {
  id: string;
  email: string;
  full_name: string | null;
  role_id: string;
  created_at: Date;
  created_by: string | null;
  updated_at: Date;
  updated_by: string | null;
  is_deleted: boolean;

  role?: {
    id: string;
    name: string;
  } | null;
}

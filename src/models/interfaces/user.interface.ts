import { Role } from "./role.interface";

export interface IUser {
    email:      string;
    full_name:  string;
    id:         string;
    role_id:    string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    is_deleted: boolean;
    role:       Role;
}

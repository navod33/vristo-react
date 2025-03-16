export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    branch_id: number | null;
    role: string;
}

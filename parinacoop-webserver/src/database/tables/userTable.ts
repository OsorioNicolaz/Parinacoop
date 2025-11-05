import { Role } from '@/contexts/shared/enums/roles.enum';

export interface UserTable {
  run: number;
  role: Role;
  password: string;
  password_attempts?: number;
  enabled?: boolean;
  created_at?: number;
  updated_at?: number;
}

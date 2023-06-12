import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeSkillInterface {
  id?: string;
  skill_name: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EmployeeSkillGetQueryInterface extends GetQueryInterface {
  id?: string;
  skill_name?: string;
  user_id?: string;
}

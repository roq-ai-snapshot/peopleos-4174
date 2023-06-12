import { IntegrationInterface } from 'interfaces/integration';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  integration?: IntegrationInterface[];
  user?: UserInterface;
  _count?: {
    integration?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}

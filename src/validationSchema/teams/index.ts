import * as yup from 'yup';
import { teamMemberValidationSchema } from 'validationSchema/team-members';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  team_leader_id: yup.string().nullable().required(),
  team_member: yup.array().of(teamMemberValidationSchema),
});

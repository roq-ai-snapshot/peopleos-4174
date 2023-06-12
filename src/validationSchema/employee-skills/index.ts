import * as yup from 'yup';

export const employeeSkillValidationSchema = yup.object().shape({
  skill_name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});

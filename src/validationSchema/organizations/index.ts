import * as yup from 'yup';
import { integrationValidationSchema } from 'validationSchema/integrations';

export const organizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  integration: yup.array().of(integrationValidationSchema),
});

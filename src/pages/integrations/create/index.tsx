import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createIntegration } from 'apiSdk/integrations';
import { Error } from 'components/error';
import { integrationValidationSchema } from 'validationSchema/integrations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { IntegrationInterface } from 'interfaces/integration';

function IntegrationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: IntegrationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createIntegration(values);
      resetForm();
      router.push('/integrations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<IntegrationInterface>({
    initialValues: {
      integration_type: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: integrationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Integration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="integration_type" mb="4" isInvalid={!!formik.errors?.integration_type}>
            <FormLabel>Integration Type</FormLabel>
            <Input
              type="text"
              name="integration_type"
              value={formik.values?.integration_type}
              onChange={formik.handleChange}
            />
            {formik.errors.integration_type && <FormErrorMessage>{formik.errors?.integration_type}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'integration',
  operation: AccessOperationEnum.CREATE,
})(IntegrationCreatePage);

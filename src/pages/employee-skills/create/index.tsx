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
import { createEmployeeSkill } from 'apiSdk/employee-skills';
import { Error } from 'components/error';
import { employeeSkillValidationSchema } from 'validationSchema/employee-skills';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { EmployeeSkillInterface } from 'interfaces/employee-skill';

function EmployeeSkillCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmployeeSkillInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmployeeSkill(values);
      resetForm();
      router.push('/employee-skills');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeSkillInterface>({
    initialValues: {
      skill_name: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: employeeSkillValidationSchema,
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
            Create Employee Skill
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="skill_name" mb="4" isInvalid={!!formik.errors?.skill_name}>
            <FormLabel>Skill Name</FormLabel>
            <Input type="text" name="skill_name" value={formik.values?.skill_name} onChange={formik.handleChange} />
            {formik.errors.skill_name && <FormErrorMessage>{formik.errors?.skill_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'employee_skill',
  operation: AccessOperationEnum.CREATE,
})(EmployeeSkillCreatePage);

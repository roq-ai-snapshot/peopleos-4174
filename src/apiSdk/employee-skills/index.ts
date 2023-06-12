import axios from 'axios';
import queryString from 'query-string';
import { EmployeeSkillInterface, EmployeeSkillGetQueryInterface } from 'interfaces/employee-skill';
import { GetQueryInterface } from '../../interfaces';

export const getEmployeeSkills = async (query?: EmployeeSkillGetQueryInterface) => {
  const response = await axios.get(`/api/employee-skills${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployeeSkill = async (employeeSkill: EmployeeSkillInterface) => {
  const response = await axios.post('/api/employee-skills', employeeSkill);
  return response.data;
};

export const updateEmployeeSkillById = async (id: string, employeeSkill: EmployeeSkillInterface) => {
  const response = await axios.put(`/api/employee-skills/${id}`, employeeSkill);
  return response.data;
};

export const getEmployeeSkillById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employee-skills/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployeeSkillById = async (id: string) => {
  const response = await axios.delete(`/api/employee-skills/${id}`);
  return response.data;
};

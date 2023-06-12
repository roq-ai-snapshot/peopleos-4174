import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { employeeSkillValidationSchema } from 'validationSchema/employee-skills';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.employee_skill
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEmployeeSkillById();
    case 'PUT':
      return updateEmployeeSkillById();
    case 'DELETE':
      return deleteEmployeeSkillById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmployeeSkillById() {
    const data = await prisma.employee_skill.findFirst(convertQueryToPrismaUtil(req.query, 'employee_skill'));
    return res.status(200).json(data);
  }

  async function updateEmployeeSkillById() {
    await employeeSkillValidationSchema.validate(req.body);
    const data = await prisma.employee_skill.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEmployeeSkillById() {
    const data = await prisma.employee_skill.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

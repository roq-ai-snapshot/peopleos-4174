const mapping: Record<string, string> = {
  'employee-skills': 'employee_skill',
  integrations: 'integration',
  organizations: 'organization',
  teams: 'team',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

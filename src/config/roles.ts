const allRoles = {
  user: ['getProducts','searchProducts'],
  admin: ['getUsers', 'manageUsers'],
  seller: []
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));

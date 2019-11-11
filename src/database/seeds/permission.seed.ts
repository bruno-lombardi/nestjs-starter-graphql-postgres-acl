const basePerms = ['create', 'read', 'update', 'delete'];
const buildPermission = (name: string, resource: string) => ({
  name,
  resource,
});
const basePermissionsForResource = (resource: string) => {
  return basePerms.map(p => buildPermission(p, resource));
};
const permissions = [
  ...basePermissionsForResource('user'),
  ...basePermissionsForResource('product'),
  ...basePermissionsForResource('order'),
];

export default permissions;

export const adminRole = {
  name: 'ADMIN',
  title: 'Administrador',
  description:
    'Administradores possuem acesso completo a todos os recursos do sistema.',
};

export const managerRole = {
  name: 'MANAGER',
  title: 'Gerente',
  description:
    'O gerente tem acesso aos recursos da loja, pode cadastrar produtos, gerenciar pedidos e ver dados dos clientes.',
};

export const customerRole = {
  name: 'CUSTOMER',
  title: 'Cliente',
  description:
    'Clientes fazem pedidos, pagamentos, e consultam os produtos da loja.',
};

export default [].concat(adminRole, customerRole, managerRole);

const { Sequelize } = require('sequelize');
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
});

class DB {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = {};
    this.initModels();
    this.associateModels();
  }

  initModels() {
    // Define your models here
    const Department = require('./models/department')(this.sequelize);
    const Role = require('./models/role')(this.sequelize);
    const Employee = require('./models/employee')(this.sequelize);

    this.models = {
      Department,
      Role,
      Employee,
    };
  }

  associateModels() {
    // Define your model associations here
    const { Department, Role, Employee } = this.models;

    Department.hasMany(Role, { foreignKey: 'department_id' });
    Role.belongsTo(Department, { foreignKey: 'department_id' });

    Employee.belongsTo(Role, { foreignKey: 'role_id' });
    Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'manager_id' });
    Employee.hasMany(Employee, { as: 'subordinates', foreignKey: 'manager_id' });
  }

  async findDepartments() {
    return this.models.Department.findAll({ order: ['name'] });
  }

  async findRoles() {
    return this.models.Role.findAll({ order: [['position']] });
  }

  async findEmployees() {
    return this.models.Employee.findAll({
      include: [
        { model: this.models.Role },
        { model: this.models.Department },
        { model: this.models.Employee, as: 'manager' },
      ],
      order: [[this.models.Role, 'salary', 'DESC']],
    });
  }

  async findBudgets() {
    return this.models.Department.findAll({
      include: [{ model: this.models.Role }],
      attributes: ['name'],
      group: ['Department.id'],
      order: [[Sequelize.literal('SUM(Role.salary)'), 'DESC']],
    });
  }

  async addDepartment(departmentName) {
    return this.models.Department.create({ name: departmentName });
  }

  async addRole(rolePosition, roleSalary, departmentId) {
    return this.models.Role.create({ position: rolePosition, salary: roleSalary, department_id: departmentId });
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    return this.models.Employee.create({ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
  }

  async updateEmployee(employeeId, roleId) {
    return this.models.Employee.update({ role_id: roleId }, { where: { id: employeeId } });
  }

  async removeEmployee(employeeId) {
    return this.models.Employee.destroy({ where: { id: employeeId } });
  }

  async removeRole(roleId) {
    return this.models.Role.destroy({ where: { id: roleId } });
  }

  async removeDepartment(departmentId) {
    return this.models.Department.destroy({ where: { id: departmentId } });
  }
}

module.exports = new DB(sequelize);

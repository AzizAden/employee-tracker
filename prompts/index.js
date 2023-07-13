const inquirer = require('inquirer');
require('console.table');
const db = require('../db');

const viewDepartments = async () => {
  const [departments] = await db.findDepartments();
  console.table(departments);
  askQuestions();
};

const viewEmployees = async () => {
  const [employees] = await db.findEmployees();
  console.table(employees);
  askQuestions();
};

const viewRoles = async () => {
  const [roles] = await db.findRoles();
  console.table(roles);
  askQuestions();
};

const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'departmentName',
      validate: (response) => validation.required(response),
    },
  ]);
  await db.addDepartment(answer.departmentName);
  const [updatedDepartments] = await db.findDepartments();
  console.table(updatedDepartments);
  askQuestions();
};

const addRole = async () => {
  const [departments] = await db.findDepartments();
  const departmentChoices = departments.map((department) => {
    return { name: department.name, value: department.id };
  });
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: 'Name of the new role?',
      name: 'roleTitle',
      validate: (response) => validation.required(response),
    },
    {
      type: 'input',
      message: 'Salary of the new role? $',
      name: 'roleSalary',
      validate: (response) => validation.required(response),
    },
    {
      type: 'list',
      message: 'Which department is the new role in?',
      name: 'departmentId',
      choices: departmentChoices,
    },
  ]);

  await db.addRole(
    answers.roleTitle,
    parseInt(answers.roleSalary),
    answers.departmentId
  );
  const [updatedRoles] = await db.findRoles();
  console.table(updatedRoles);
  askQuestions();
};

const addEmployee = async () => {
  const [employees] = await db.findEmployees();
  let employeeAnsw = await employees.map((employee) => {
    return {
      name: [employee.first_name, employee.last_name].join(' '),
      value: employee.id,
    };
  });
  employeeAnsw.push({ name: 'No manager', value: null });

  const [roles] = await db.findRoles();
  const roleAnsw = await roles.map((role) => {
    return { name: role.position, value: role.role_id };
  });

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: (response) => validation.required(response),
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: (response) => validation.required(response),
    },
    {
      type: 'list',
      message: 'What is the role of the employee?',
      name: 'roleId',
      choices: roleAnsw,
    },
    {
      type: 'list',
      message: "Who is the employee's manager?",
      name: 'managerId',
      choices: employeeAnsw,
    },
  ]);

  await db.addEmployee(
    answers.firstName,
    answers.lastName,
    answers.roleId,
    answers.managerId
  );

  const [updatedEmployees] = await db.findEmployees();
  console.table(updatedEmployees);
  askQuestions();
};

const updateEmployee = async () => {
  const [employees] = await db.findEmployees();
  let employeeAnsw = await employees.map((employee) => {
    return {
      name: [employee.first_name, employee.last_name].join(' '),
      value: employee.id,
    };
  });

  const [roles] = await db.findRoles();
  const roleAnsw = await roles.map((role) => {
    return { name: role.position, value: role.role_id };
  });

  const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee is being updated?',
      name: 'employeeId',
      choices: employeeAnsw,
    },
    {
      type: 'list',
      message: "What is the employee's new Role?",
      name: 'newRoleId',
      choices: roleAnsw,
    },
  ]);

  await db.updateEmployee(answers.employeeId, answers.newRoleId);
  const [updatedEmployees] = await db.findEmployees();
  console.table(updatedEmployees);
  askQuestions();
};

const questionList = {
  ViewDepartments: '= View departments',
  ViewRoles: '= View roles',
  ViewEmployees: '= View employees',
  AddDepartment: '+ Add a department',
  AddRole: '+ Add a role',
  AddEmployee: '+ Add an employee',
  UpdateRole: '^ Update an employee role',
  Exit: 'Exit Program',
};

const validation = {
  required: (response) => {
    return response ? true : console.error('Please input a value before continuing.');
  },
};

let currentOption;

const questions = async () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
          questionList.ViewDepartments,
          questionList.ViewRoles,
          questionList.ViewEmployees,
          questionList.AddDepartment,
          questionList.AddRole,
          questionList.AddEmployee,
          questionList.UpdateRole,
          questionList.Exit,
        ],
      },
    ])
    .then(async (answers) => {
      try {
        currentOption = answers.option;
        if (currentOption === questionList.ViewDepartments) {
          viewDepartments();
        } else if (currentOption === questionList.ViewRoles) {
          viewRoles();
        } else if (currentOption === questionList.ViewEmployees) {
          viewEmployees();
        } else if (currentOption === questionList.AddDepartment) {
          addDepartment();
        } else if (currentOption === questionList.AddRole) {
          addRole();
        } else if (currentOption === questionList.AddEmployee) {
          addEmployee();
        } else if (currentOption === questionList.UpdateRole) {
          updateEmployee();
        } else {
          process.exit();
        }
      } catch (err) {
        if (err) console.log('Something went wrong...');
      }
    });
};

module.exports = questions;

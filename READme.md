# Employee Tracker

Welcome to the Employee Tracker, a command-line application that helps you manage departments, roles, and employees in your organization.

## Features

- View all departments: Display a formatted table showing department names and IDs.
- View all roles: Show job titles, role IDs, associated departments, and salaries.
- View all employees: Present employee data, including IDs, names, job titles, departments, salaries, and managers.
- Add a department: Add a new department to the database.
- Add a role: Create a new role and assign it to a department.
- Add an employee: Enter details for a new employee, including first name, last name, role, and manager.
- Update an employee role: Update the role of an existing employee.
- Delete an employee: Remove an employee from the database.
- Delete a role: Delete a role and associated employees.
- Delete a department: Remove a department and associated roles and employees.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd employee-tracker`
3. Install dependencies: `npm install`
4. Set up your database connection: Update the connection details in `db/connection.js` file.
5. Import the database schema: Use the provided `db/schema.sql` file to create the necessary tables in your database.
6. Optional: Run the provided `db/seeds.sql` file to populate the database with sample data.
7. Start the application: `npm start`

## Dependencies

- Inquirer: For the interactive command-line interface.
- Console.Table: For formatting and displaying data in a table.
- Sequelize: For database connectivity and management.
- MySQL2: MySQL database driver for Sequelize.

## Usage

- Select the desired option from the presented menu to perform various operations on departments, roles, and employees.
- Follow the prompts to provide necessary information such as names, salaries, departments, etc.
- View the results displayed in formatted tables.

## Contributions

ABDIAZIZ ADEN
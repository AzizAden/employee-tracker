INSERT INTO department (name)
VALUES ("Talent Management"), ("Leadership"), ("Operations"), ("Engineering"), ("Support");

INSERT INTO role (position, salary, department_id)
VALUES
("Talent Acquisition Manager", 50000, 2),
("CEO", 136000, 3),
("Engineering Manager", 75000, 3),
("Software Engineer", 55000, 4),
("Operations Manager", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Smith', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Williams', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Davis', 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Daniel', 'Wilson', 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Olivia', 'Anderson', 4, 4);

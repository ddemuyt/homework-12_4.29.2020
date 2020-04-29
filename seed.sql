DROP DATABASE IF EXISTS employee_managerDB;

CREATE database employee_managerDB;

USE employee_managerDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DEC,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Legal");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 125000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", 90000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 123456, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 175000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Morpheus", "unknown", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Anderson", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zark", "Muckerberg", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Belfort", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 5, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("James", "McGill", 6 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Day", 7, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Hermes", "Conrad", 8);
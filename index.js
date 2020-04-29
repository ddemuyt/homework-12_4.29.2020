var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Praise4Pelor",
  database: "employee_managerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  runApp();
});

function runApp() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Display all employees",
        "Display all employees by Department",
        // "3",
        "Add an employee",
        "Remove an employee",
        "Update an employee's role",
        "Update an employee's manager"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Display all employees":
                employeeDisplay();
                break;
        
            case "Display all employees by Department":
                departmentDisplay();
                break;
        
            case "Display all employees by Manager":
                managerDisplay();
                break;
        
            case "Add an employee":
                addEmployee();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add a department":
                addDept();
                break;
        
            case "Remove an employee":
                removeEmployee();
                break;

            case "Update an employee's role":
                updateRole();
                break;  
                
            case "Update an employee's manager":
                updateManager();
                break;  
        }
    });
}

function employeeDisplay() {
    connection.query(
        `SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee 
            LEFT JOIN role ON role.id = employee.role_id 
                LEFT JOIN department ON role.department_id = department.id
                    ORDER BY last_name ASC;`, 
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runApp();
                });
}

function departmentDisplay() {
    inquirer
            .prompt({
                name: "department",
                type: "rawlist",
                message: "What department would you like to see?",
                choices: [
                  "Engineering",
                  "Sales",
                  "Legal",
                  "Finance"
                ] 
            })
            .then(answer => {
                connection.query(
                    `SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee 
                        LEFT JOIN role ON role.id = employee.role_id 
                            LEFT JOIN department ON role.department_id = department.id 
                                WHERE department.department_name = ? ORDER BY last_name ASC;`,
                answer.department, 
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runApp();
                });
            })
}

function managerDisplay() {
    const managerList = [];
    connection.query(
        `SELECT id first_name, last_name
            FROM employee WHERE manager = 1;`,
    (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name)
      }
    });
    
    inquirer
            .prompt({
                name: "manager",
                type: "rawlist",
                message: "What manager's supervisees would you like to see?",
                choices: managerList
            })
            .then(a => {
                const s = a.delete.split(" ");
                connection.query(`SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee LEFT JOIN role ON role.id = employee.id LEFT JOIN department ON role.department_id = department.id WHERE employee.manager_id = ? ORDER BY last_name ASC;`,
                parseInt(s[0]), 
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runApp();
                });
            })
}

function addEmployee() {
    inquirer
            .prompt([
                {
                name: "firstname",
                type: "input",
                message: "What is the employee's first name?"
                },
                {
                name: "lastname",
                type: "input",
                message: "What is the employee's last name?"
                },
                {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: [
                    {value: 1, name: "Lead Engineer"},
                    {value: 2, name: "Senior Engineer"},
                    {value: 3, name: "Junior Engineer"},
                    {value: 4, name: "Sales Lead"},
                    {value: 5, name: "Salesperson"},
                    {value: 6, name: "Legal Team Lead"},
                    {value: 7, name: "Lawyer"},
                    {value: 8, name: "Accountant"}
                ]
                },
                {
                    name: "confirm_manager",
                    type: "confirm",
                    message: "Is this employee a manager?"
                },
                {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: [
                    {value: 1, name: "Morpheus"},
                    {value: 2, name: "Thomas Anderson"},
                    {value: 4, name: "Jordan Belfort"},
                    {value: 6, name: "James McGill"},
                    {value: null, name: "None"}
                ]
                }
            ])
            .then(a => {
                connection.query(
                    `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager) 
                        VALUES (?, ?, ?, ?, ?);`,
                    [a.firstname, a.lastname, a.role, a.manager, a.confirm_manager], 
                (err, res) => {
                    if (err) throw err;
                    console.log("Successfully added employee");
                    runApp();
                });
            })
}

function addRole() {

}

function addDept() {
    
}

function removeEmployee() {
    const employeeList = [];
    connection.query(
        `SELECT id, first_name, last_name
            FROM employee;`,
    (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name)
        }
        inquirer
        .prompt(
            {
            name: "delete",
            message: "Which employee would you like to delete?",
            type: "list",
            choices: employeeList
            }
        )
        .then(a => {
            const s = a.delete.split(" ");

            connection.query(
            `DELETE FROM employee WHERE id = ?`,
            parseInt(s[0]),
            (err, res) => {
                if (err) throw err;
                console.log("Employee was successfully deleted");
                runApp();
            });
        });
    });
    
}

function updateRole() {
    
}

function updateManager() {
    
}
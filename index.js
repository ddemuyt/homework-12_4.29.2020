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
  database: "employee_managerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runApp();
});

async function runApp() {
    try{
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ]
    })
    await function(answer) {
        switch (answer.action) {
            case "1":
                employeeDisplay();
                break;
        
            case "2":
                departmentDisplay();
                break;
        
            // case "3":
            //     managerDisplay();
            //     break;
        
            case "4":
                addEmployee();
                break;
        
            case "5":
                removeEmployee();
                break;

            case "6":
                updateRole();
                break;  
                
            case "7":
                updateManager();
                break;  
        }
    }
}
    catch (err) {
        console.error(err);
    }
}

function employeeDisplay() {
    return connection.query("SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, ")
}

function departmentDisplay() {
    return inquirer
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

            })
}

// function managerDisplay() {
//     return inquirer
//             .prompt({
//                 name: "manager",
//                 type: "rawlist",
//                 message: "What manager's supervisees would you like to see?",
//                 choices: [
//                   "Engineering",
//                   "Sales",
//                   "Legal",
//                   "Finance"
//                 ] 
//             })
//             .then(answer => {
                
//             })
// }

function addEmployee() {
    return inquirer
            .prompt(
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
                    "Lead Engineer",
                    "Senior Engineer",
                    "Junior Engineer",
                    "Sales Lead",
                    "Salesperson",
                    "Legal Team Lead",
                    "Lawyer",
                    "Accountant"
                ]
                },
                {
                name: "manager",
                type: "input",
                message: "What is the employee's role?",
                choices: [
                    "Morpheus",
                    "Thomas Anderson",
                    "Jordan Belfort",
                    "James McGill"
                ]
                }
            )
            .then(answer => {
                
            })
}

function removeEmployee() {
    
}

function updateRole() {
    
}

function updateManager() {
    
}
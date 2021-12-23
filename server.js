const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    user: "root",
    database: "employees_db",
  },
  'Connected to the employees_db database.'
);

inquirer
  .prompt([
    {
      type: "list",
      message: "Select Option",
      name: "select",
      choices: [
        "view all employees",
        "view all roles",
        "view all departments",
        "exit",
      ],
    },
  ])
  .then((answer) => {
    switch (answer.selection) {
      case "view all employees": {
        db.query('SELECT * FROM employee')
      }
      case "view all roles": {
      }
      case "view all departments": {
      }
      default:
        return process.exit();
    }
  });

const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    user: "root",
    database: "employees_db",
  },
  "Connected to the employees_db database."
);

const start = () => {
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
        case "view all employees":
          {
            db.query("SELECT * FROM employee");
          }
          break;

        case "view all roles":
          {
            db.query("SELECT * FROM role");
          }
          break;
        case "view all departments":
          {
            db.query("SELECT * FROM department");
          }
          break;

        default:
          return process.exit();
      }
      return start();
    });
};

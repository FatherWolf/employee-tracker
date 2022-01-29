const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    user: "root",
    database: "employees_db",
  },
  "Connected to the employees_db database"
);

function init() {

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Make a selection',
        choices: ['View', 'Add'],
        name: 'option',
      },
      {
        type: 'list',
        message: 'Which Group of Employees?',
        choices: ['departments', 'roles', 'employees'],
        name: 'viewselection',
        when: (selection) => selection.option === 'View'
      },
      {
        type: 'list',
        message: 'What change would you like to make',
        choices: ['role', 'department',  'employee'],
        name: 'addselection',
        when: (selection) => selection.option === 'Add'
      },
      {
        message: 'What is the department name?',
        name: 'departmentname',
        when: (selection) => selection.addselection === 'department'
      }
      
    ])
    .then((selection) => {
      const {option, viewselection, addselection, departmentname} = selection;
      switch (selection) {
        case 'View':
          db.query(`SELECT * FROM ${viewselection};`, (err, results) => {
            console.table(results)
            init()
          });
          break;
        case 'Add':
          if (addselection === 'department') addDepartment(addselection, departmentname)
          if (addselection === 'role') addrole(db);
          if (addselection === 'employee') addemployee(db)
          break;
        case 'Add a role':
          db.query('INSERT INTO roles (name) VALUES;', (err, results) => {
            console.table(results)
            init()
          });
          break;
        case 'Add an employee':
          db.query('INSERT INTO employees (name) VALUES;', (err, results) => {
            console.table(results)
            init()
          });
          break;
        default:
          break;
      }
    })
};

function addDepartment(table, data) {
  db.query(`INSERT INTO ${table}s (name) VALUES ("${data}")  ;`, (err, results) => {
    console.table(results)
    init()
  })
}

function addrole(db) {
  inquirer
    .prompt([
      {
        message: 'Title in company?',
        name: 'title',
      },
      {
        message: 'How much do they make?',
        name: 'salary',
      },
      {
        message: 'Department id?',
        name: 'id',
      },
    ])
    .then((selection) => {
      const {title , salary , id} = selection;

      db.query(`INSERT INTO roles (title , salary , department_id) VALUES ('${title}' , ${salary} , ${id});`, (err, answers) => {
        console.table(answers);
        init();
      })
    })
};

function addemployee() {
    

  inquirer
    .prompt([
      {
        message: 'Firstname',
        name: 'firstname',
      },
      {
        message: 'Lastname?',
        name: 'lastname',
      },
      {
        type: 'number',
        message: 'ID?',
        name: 'roleid',
      },
      {
        type: 'number',
        message: 'What is their managers id',
        name: 'Mid',
      }
    ])
    .then((answers) => {
      const {firstName, lastName, roleid, Mid} = answers;

      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}' , '${lastName}' , ${roleid}, ${Mid});`, (err, results) => {
        console.table(results);
        init();
      })
    })
};





function run() {
  init();
}

run();
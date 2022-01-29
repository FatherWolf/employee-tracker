const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    user: "root",
    database: "employees_db",
  },
  
);

function init() {
  try {
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Make a selection',
          choices: ['View', 'Add'],
          name: 'choices',
        },
        {
          type: 'list',
          message: 'Which Group of Employees?',
          choices: ['department', 'role', 'employee'],
          name: 'viewselection',
          when: (selection) => selection.choices === 'View'
        },
        {
          type: 'list',
          message: 'What change would you like to make',
          choices: ['role', 'department', 'employee'],
          name: 'addselection',
          when: (selection) => selection.choices === 'Add'
        },
        {
          message: 'What is the department name?',
          name: 'departmentname',
          when: (selection) => selection.addselection === 'department'
        }

      ])
      .then((selection) => {
       
        const { choices, viewselection, addselection, departmentname } = selection;
        switch (choices) {
          case 'View':
            db.query(`SELECT * FROM ${viewselection};`, (err, results) => {
              console.log(results,)
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
            process.exit();
            break;
        }
      })
  } catch (err) {
    console.log(err)
  }
};

function addDepartment(table, data) {
  db.query(`INSERT INTO ${table} (name) VALUES ("${data}")  ;`, (err, results) => {
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
      const { title, salary, id } = selection;

      db.query(`INSERT INTO role (title , salary , department_id) VALUES ('${title}' , ${salary} , ${id});`, (err, answers) => {
        console.table(answers);
        if (err) {
          console.log(err)
          }
       
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
      const { firstName, lastName, roleid, Mid } = answers;

      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}' , '${lastName}' , ${roleid}, ${Mid});`, (err, results) => {
        console.table(results);
        init();
      })
    })
};






  init();

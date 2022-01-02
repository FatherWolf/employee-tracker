USE employees_db;
SELECT * FROM employee
LEFT JOIN role 
ON role.id = employee.role_id
LEFT JOIN employee AS manager
ON employee.manager_id = employee.id;
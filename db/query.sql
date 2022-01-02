USE employees_db;

SELECT 
CONCAT(employee.first_name," ",employee.last_name) AS employee_name,
CONCAT(manager.first_name," ",manager.last_name) AS manager_name,
role.title AS role
FROM employee manager
RIGHT JOIN employee
ON manager.id = employee.manager_id
INNER JOIN role
ON role.id = employee.role_id;

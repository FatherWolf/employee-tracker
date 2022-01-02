use employees_db;

SELECT * FROM employee
JOIN role on role.id = employee.role_id
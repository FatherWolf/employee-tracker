use employees_db


INSERT INTO department
(name)
VALUES
('Engineering')
('Sales')
('Legal')
('Finance')

INSERT INTO role
(title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1)
('Engineer', 125000, 1)
('Lead Sales', 100000, 2)
('Sales Agent', 75000, 2)
('HR Manger', 95000, 3)
('HR', 50000, 3)

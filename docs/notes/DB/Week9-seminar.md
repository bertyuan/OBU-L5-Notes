# Week 9 Seminar - Refine and Refresh

```sql
-- Question a
-- Create the tables above in the schema, taking into account the practical size of the
-- data. 
CREATE TABLE DB_module (
	Student_name tinytext,
	DB_Grade tinytext
);

CREATE TABLE FOC_module (
	Student_name tinytext,
    FOC_Grade tinytext
);

-- insert data to DB
INSERT INTO DB_module (Student_name, DB_Grade) VALUES
('Garry', 'C'),
('Robin', 'D'),
('Hans',  'A'),
('Lily',  'B'),
('Sophie','B');

-- insert data to FOC
INSERT INTO FOC_module (Student_name, FOC_Grade) VALUES
('Garry', 'A'),
('Robin', 'C'),
('Hans',  'B'),
('Denis', 'A'),
('Lewis', 'D');

-- b(1)
-- Write a basic SQL statement to retrieve the students who are intersecting
-- between both modules.
SELECT Student_name
FROM DB_module
WHERE Student_name IN (
    SELECT Student_name
    FROM FOC_module
);

-- b(2)
-- The university is planning an external workshop. Only the students enrolled in
-- both modules, DB and FOC, are allowed to attend that workshop. Write a Join
-- statement to help the coordinator make the right decision. 
SELECT
    d.Student_name,
    d.DB_Grade,
    f.FOC_Grade
FROM DB_module AS d
INNER JOIN FOC_module AS f
    ON d.Student_name = f.Student_name;
    
    
-- Validate your answers by comparing the output from sections b(1) and b(2).
-- the returned value of b(2) has two more info:
-- DB_Grade & FOC-Grade

-- Question c
-- The workshop coordinator only selects students enrolled in DB and FOC modules.
-- However, there are not enough students with the necessary conditions to fill all the
-- available seats. So the coordinator wants a list of students who are already enrolled
-- in one module.
SELECT Student_name
FROM DB_module
UNION
SELECT Student_name
FROM FOC_module;

-- Question d
-- A programming contest has been planned to take place on Friday morning in the
-- library. Students who take the DB module can join the contest. However, students
-- enrolled in the FOC class can not join because their module has a class at the contest
-- time. Write a join SQL statement to retrieve the prospective contest candidates. 
SELECT
    d.Student_name,
    d.DB_Grade
FROM DB_module AS d
LEFT JOIN FOC_module AS f
    ON d.Student_name = f.Student_name
WHERE f.Student_name IS NULL;

-- Question e
-- Dr Maged is presenting a basic introduction to databases. Only students enrolled in
-- the FOC module but not enrolled in the DB module can join the presentation. Help
-- the teacher invite deserving students to the presentation. 
SELECT
    f.Student_name,
    f.FOC_Grade
FROM FOC_module AS f
LEFT JOIN DB_module AS d
    ON f.Student_name = d.Student_name
WHERE d.Student_name IS NULL;
```

CREATE DATABASE if NOT EXISTS 5thSemWebTechLab;

USE 5thSemWebTechLab;

DROP TABLE IF EXISTS `2024CSB037`;
CREATE TABLE `2024CSB037` (
    rollno VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50),
    gender VARCHAR(10),
    department VARCHAR(20),
    CGPA DECIMAL(3, 2)
);

INSERT INTO
    `2024CSB037` (
        rollno,
        name,
        gender,
        department,
        CGPA
    )
VALUES (
        '2024CSB001',
        'Rahul Sharma',
        'Male',
        'CSE',
        8.45
    ),
    (
        '2024CSB002',
        'Priya Das',
        'Female',
        'CSE',
        9.10
    ),
    (
        '2024ETB003',
        'Amit Roy',
        'Male',
        'ECE',
        7.82
    ),
    (
        '2024ETB004',
        'Sneha Ghosh',
        'Female',
        'ECE',
        8.67
    ),
    (
        '2024MEB005',
        'Arjun Singh',
        'Male',
        'ME',
        6.95
    );

-- SELECT * FROM `2024CSB037`;

-- DESCRIBE `2024CSB037`;
~
USE module;

CREATE TABLE lecturer (
    lecturer_id  INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    full_name VARCHAR(50),
    gender ENUM('MALE','FEMALE'),
    email VARCHAR(50),
    phone_number VARCHAR(50),
    department VARCHAR(50),
    specialization VARCHAR(16),
    years_of_experience INT
);

CREATE TABLE Majors (
    major_id  INT UNSIGNED NOT NULL PRIMARY KEY,
    major VARCHAR(16),
    lecturer_id INT unsigned,
    start_date DATE,
    FOREIGN KEY (lecturer_id) REFERENCES lecturer(lecturer_id)
);

CREATE TABLE Students (
    student_id  INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    email VARCHAR(50),
    major_id INT unsigned,
    FOREIGN KEY (major_id) REFERENCES Majors(major_id)
);

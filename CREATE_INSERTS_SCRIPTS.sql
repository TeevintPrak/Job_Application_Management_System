DROP TABLE LocatedAt;
DROP TABLE ExperienceRequired;
DROP TABLE Attends;
DROP TABLE Connects;
DROP TABLE CoverLetter;
DROP TABLE Experience;
DROP TABLE LocationPostalCode;
DROP TABLE Location;
DROP TABLE SkillRequired;
DROP TABLE Skills;
DROP TABLE Reference;
DROP TABLE HR;
DROP TABLE People;
DROP TABLE Interview;
DROP TABLE JobPosting;
DROP TABLE Resume;
DROP TABLE Company;

CREATE TABLE Company (
   companyID       INTEGER PRIMARY KEY,
   website         VARCHAR(100) UNIQUE,
   name            VARCHAR(50)
);

CREATE TABLE Resume (
   resume_upload_date     DATE,
   resume_name           VARCHAR(50),
   text_content          VARCHAR(4000) UNIQUE,
   PRIMARY KEY (resume_name, resume_upload_date)
);

CREATE TABLE JobPosting (
   source_link         VARCHAR(100) PRIMARY KEY,
   companyID           INTEGER NOT NULL,
   resume_upload_date  DATE NOT NULL,
   resume_name         VARCHAR(50) NOT NULL,
   position            VARCHAR(50),
   salary              INTEGER,
   status              NUMBER(1, 0),
   FOREIGN KEY (companyID) REFERENCES Company ON DELETE CASCADE,
   FOREIGN KEY (resume_name, resume_upload_date) REFERENCES Resume ON DELETE CASCADE
);

CREATE TABLE Interview(
   interview_date                DATE PRIMARY KEY,
   source_link         VARCHAR(100) NOT NULL,
   companyID           INTEGER,
   notes               VARCHAR(3000),
   type                VARCHAR(20),
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE,
   FOREIGN KEY (companyID) REFERENCES Company ON DELETE CASCADE
);

CREATE TABLE People (
   email           VARCHAR(60) PRIMARY KEY,
   companyID       INTEGER NOT NULL,
   position        VARCHAR(30),
   first_name      VARCHAR(25),
   last_name       VARCHAR(25),
   industry        VARCHAR(20),
   department      VARCHAR(20),
   FOREIGN KEY (companyID) REFERENCES Company ON DELETE CASCADE
);

CREATE TABLE HR (
   email           VARCHAR(60) PRIMARY KEY,
   phone_number    CHAR(12),
   FOREIGN KEY (email) REFERENCES People ON DELETE CASCADE
);

CREATE TABLE Reference (
   email           VARCHAR(60) PRIMARY KEY,
   letter          VARCHAR(4000),
   FOREIGN KEY (email) REFERENCES People ON DELETE CASCADE
);

CREATE TABLE Skills (
   name                VARCHAR(50) PRIMARY KEY,
   skill_category      VARCHAR(50),
   proficiency         VARCHAR(20)
);

CREATE TABLE Location (
   postal_code         CHAR(6) PRIMARY KEY,
   city                VARCHAR(70),
   province            VARCHAR(50),
   country             VARCHAR(50)
);

CREATE TABLE LocationPostalCode (
   postal_code         CHAR(6),
   street_address      VARCHAR(70) PRIMARY KEY,
   FOREIGN KEY (postal_code) REFERENCES Location ON DELETE CASCADE
);

CREATE TABLE Experience (
   job_position        VARCHAR(50),
   duration            INTEGER,
   job_level           VARCHAR(25),
   PRIMARY KEY (job_position, duration)
);

CREATE TABLE CoverLetter (
   upload_date         DATE,
   file_name           VARCHAR(50),
   source_link         VARCHAR(100),
   text_content        VARCHAR(4000),
   PRIMARY KEY (file_name, upload_date),
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE
);

CREATE TABLE Connects (
   source_link 	 VARCHAR(100),
   email       	 VARCHAR(60),
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE,
   FOREIGN KEY (email) REFERENCES People ON DELETE CASCADE
);

CREATE TABLE Attends (
   email             VARCHAR(60),
   interview_date    DATE,
   FOREIGN KEY (email) REFERENCES People ON DELETE CASCADE,
   FOREIGN KEY (interview_date) REFERENCES Interview ON DELETE CASCADE
);

CREATE TABLE ExperienceRequired (
   job_position        VARCHAR(50),
   duration            INTEGER,
   source_link         VARCHAR(100),
   FOREIGN KEY (job_position, duration) REFERENCES Experience ON DELETE CASCADE,
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE
);

CREATE TABLE LocatedAt (
   postal_code        CHAR(6),
   source_link        VARCHAR(100) NOT NULL,
   FOREIGN KEY (postal_code) REFERENCES Location ON DELETE CASCADE,
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE
);

CREATE TABLE SkillRequired (
   source_link       VARCHAR(100) NOT NULL,
   name              VARCHAR(50),
   FOREIGN KEY (name) REFERENCES Skills ON DELETE CASCADE,
   FOREIGN KEY (source_link) REFERENCES JobPosting ON DELETE CASCADE
);

INSERT INTO Company VALUES (1, 'https://google.com', 'Google');
INSERT INTO Company VALUES (2, 'https://microsoft.com', 'Microsoft');
INSERT INTO Company VALUES (3, 'https://apple.com', 'Apple');
INSERT INTO Company VALUES (4, 'https://rbc.com', 'RBC');
INSERT INTO Company VALUES (5, 'https://tesla.com', 'Tesla');

INSERT INTO Resume VALUES (TO_DATE('2023/10/20 4:00:00', 'yyyy/mm/dd hh:mi:ss'), 'resume.pdf', 'Content of the resume');
INSERT INTO Resume VALUES (TO_DATE('2019/08/02 3:56:21', 'yyyy/mm/dd hh:mi:ss'), 'main_resume.pdf', 'Content of the main resume');
INSERT INTO Resume VALUES (TO_DATE('2022/06/05 12:00:00', 'yyyy/mm/dd hh:mi:ss'), 'old_resume.docx', 'Content of the old resume');
INSERT INTO Resume VALUES (TO_DATE('2023/11/10 4:22:36', 'yyyy/mm/dd hh:mi:ss'), 'microsoft_resume.pdf', 'Content of microsoft resume');
INSERT INTO Resume VALUES (TO_DATE('2022/10/20 1:00:00', 'yyyy/mm/dd hh:mi:ss'), 'resume.pdf', 'Newly update resume content');

INSERT INTO JobPosting VALUES ('https://jobs.microsoft.com/senior-engineer', 2, TO_DATE('2022/10/20 1:00:00', 'yyyy/mm/dd hh:mi:ss'), 'resume.pdf', 'Software Developer', 100000, 1);
INSERT INTO JobPosting VALUES ('https://jobs.apple.com/developer', 3, TO_DATE('2022/10/20 1:00:00', 'yyyy/mm/dd hh:mi:ss'), 'resume.pdf', 'Frontend Developer', 110000, 1);
INSERT INTO JobPosting VALUES ('https://jobs.apple.com/senior-engineer', 3, TO_DATE('2019/08/02 3:56:21', 'yyyy/mm/dd hh:mi:ss'), 'main_resume.pdf', 'Web Developer', 60000, 1);
INSERT INTO JobPosting VALUES ('https://rbc.workday.com/backend-engineer', 4, TO_DATE('2023/11/10 4:22:36', 'yyyy/mm/dd hh:mi:ss'), 'microsoft_resume.pdf', 'Backend Engineer', 73000, 1);
INSERT INTO JobPosting VALUES ('https://tesla.com/opportunities/sde', 5, TO_DATE('2022/10/20 1:00:00', 'yyyy/mm/dd hh:mi:ss'), 'resume.pdf', 'Software Developer', 100000, 1);

INSERT INTO Interview VALUES (TO_DATE('2023/10/23 12:00:00', 'yyyy/mm/dd hh:mi:ss'), 'https://jobs.apple.com/developer', 3, 'Technical interview on Python basics', 'Technical');
INSERT INTO Interview VALUES (TO_DATE('2023/10/25 3:00:00', 'yyyy/mm/dd hh:mi:ss'), 'https://jobs.microsoft.com/senior-engineer', 2, 'C# and .NET basics', 'Technical');
INSERT INTO Interview VALUES (TO_DATE('2023/11/01 9:00:00', 'yyyy/mm/dd hh:mi:ss'), 'https://jobs.apple.com/senior-engineer', 3, 'Object oriented design', 'Technical');
INSERT INTO Interview VALUES (TO_DATE('2023/10/10 10:30:00', 'yyyy/mm/dd hh:mi:ss'), 'https://rbc.workday.com/backend-engineer', 4, 'Data structures and algorithms', 'Technical');
INSERT INTO Interview VALUES (TO_DATE('2023/10/16 11:00:00', 'yyyy/mm/dd hh:mi:ss'), 'https://tesla.com/opportunities/sde', 5, 'Phone screen', 'Behavioural');

INSERT INTO People VALUES ('person@company.com', 1, 'Financial Analyst', 'Person', 'LastName', 'Business', 'Analytics');
INSERT INTO People VALUES ('janedoe@microsoft.com', 2, 'Compliance Officer', 'Jane', 'Doe', 'Government', 'Politics');
INSERT INTO People VALUES ('jdoe@apple.com', 3, 'Senior HR Rep', 'John', 'Doe', 'Technology', 'Engineering');
INSERT INTO People VALUES ('michaelt@microsoft.com', 2, 'Compliance Officer', 'Michael', 'T', 'Government', 'Politics');
INSERT INTO People VALUES ('chrisdoe@tesla.com', 5, 'Onboarding Specialist', 'Chris', 'Doe', 'Human Resources','Onboarding');
INSERT INTO People VALUES ('jsmth@rbc.com', 4, 'Senior HR Rep', 'John', 'Smith', 'Technology', 'Engineering');

INSERT INTO People VALUES ('oliverj@google.com', 1, 'Infosec', 'Oliver', 'Jack', 'Technology', 'Engineering');
INSERT INTO People VALUES ('carons@microsoft.com', 2, 'Software Engineer', 'Caron', 'Smith', 'Technology', 'Engineering');
INSERT INTO People VALUES ('olivers@apple.com', 3, 'VR Engineer', 'Oliver', 'Smith', 'Technology', 'Engineering');
INSERT INTO People VALUES ('caronj@rbc.com', 4, 'Data Analyst', 'Caron', 'Jack', 'Business', 'Engineering');
INSERT INTO People VALUES ('jamesb@tesla.com', 5, 'Suspension Engineer', 'James', 'Burr', 'Technology', 'Engineering');

INSERT INTO HR VALUES ('janedoe@microsoft.com',  '111-111-1111');
INSERT INTO HR VALUES ('jdoe@apple.com', '222-222-2222');
INSERT INTO HR VALUES ('michaelt@microsoft.com', '333-333-3333');
INSERT INTO HR VALUES ('chrisdoe@tesla.com', '444-444-4444');
INSERT INTO HR VALUES ('jsmth@rbc.com', '555-555-5555');

INSERT INTO Reference VALUES ('janedoe@microsoft.com', 'I endorse this person');
INSERT INTO Reference VALUES ('jdoe@apple.com', 'Candidate is amazing');
INSERT INTO Reference VALUES ('michaelt@microsoft.com', 'Great at Python');
INSERT INTO Reference VALUES ('chrisdoe@tesla.com', 'Very smart and gifted');
INSERT INTO Reference VALUES ('jsmth@rbc.com', 'Wholeheartedly recommend this person for leadership positions');

INSERT INTO Skills VALUES ('Node.js', 'Backend', 'Expert');
INSERT INTO Skills VALUES ('React.js', 'Frontend', 'Expert');
INSERT INTO Skills VALUES ('Python', 'Backend', 'Beginner');
INSERT INTO Skills VALUES ('C#', 'Backend', 'Intermediate');
INSERT INTO Skills VALUES ('.NET', 'Backend', 'Intermediate');

INSERT INTO Location VALUES ('V6T1Z4', 'Vancouver', 'BC', 'Canada');
INSERT INTO Location VALUES ('V6B1C1', 'Vancouver', 'BC', 'Canada');
INSERT INTO Location VALUES ('V6B1A9', 'Vancouver', 'BC', 'Canada');
INSERT INTO Location VALUES ('M5J0E7', 'Toronto', 'ON', 'Canada');
INSERT INTO Location VALUES ('M5K1B7', 'Toronto', 'ON', 'Canada');

INSERT INTO LocationPostalCode VALUES ('V6T1Z4', '2366 Main Mall');
INSERT INTO LocationPostalCode VALUES ('V6B1C1', '858 Beatty St');
INSERT INTO LocationPostalCode VALUES ('V6B1A9', '910 Mainland St');
INSERT INTO LocationPostalCode VALUES ('M5J0E7', '4400-81 Bay St');
INSERT INTO LocationPostalCode VALUES ('M5K1B7', '222 Bay St. Suite-2000');

INSERT INTO Experience VALUES ('Software Developer', 5, 'Senior');
INSERT INTO Experience VALUES ('Software Engineer', 2, 'Intermediate');
INSERT INTO Experience VALUES ('Software Engineer', 1, 'L1');
INSERT INTO Experience VALUES ('Sales Engineer', 10, 'Senior');
INSERT INTO Experience VALUES ('Machine Learning Engineer', 1, 'Junior');

INSERT INTO CoverLetter VALUES (TO_DATE('2023/10/20 4:00:00', 'yyyy/mm/dd hh:mi:ss'), 'microsoft_cover_letter.pdf', 'https://jobs.microsoft.com/senior-engineer', 'Why I want to work for Microsoft');
INSERT INTO CoverLetter VALUES (TO_DATE('2023/02/12 9:12:13', 'yyyy/mm/dd hh:mi:ss'), 'cl.pdf', 'https://jobs.apple.com/developer', 'Why I want to work for Apple');
INSERT INTO CoverLetter VALUES (TO_DATE('2022/11/15 1:22:59', 'yyyy/mm/dd hh:mi:ss'), 'apple_cover_letter.pdf', 'https://jobs.apple.com/senior-engineer', 'Apple Cover Letter');
INSERT INTO CoverLetter VALUES (TO_DATE('2023/10/23 2:00:00', 'yyyy/mm/dd hh:mi:ss'), 'cl.pdf', 'https://rbc.workday.com/backend-engineer', 'Cover letter for RBC');
INSERT INTO CoverLetter VALUES (TO_DATE('2023/9/20 1:00:00', 'yyyy/mm/dd hh:mi:ss'), 'cl.pdf', 'https://tesla.com/opportunities/sde', 'Cover letter for tesla');


INSERT INTO Connects VALUES ('https://jobs.apple.com/developer', 'jdoe@apple.com');
INSERT INTO Connects VALUES ('https://jobs.microsoft.com/senior-engineer', 'janedoe@microsoft.com');
INSERT INTO Connects VALUES ('https://jobs.apple.com/senior-engineer', 'jdoe@apple.com');
INSERT INTO Connects VALUES ('https://rbc.workday.com/backend-engineer', 'jsmth@rbc.com');
INSERT INTO Connects VALUES ('https://tesla.com/opportunities/sde', 'chrisdoe@tesla.com');

INSERT INTO Attends VALUES ('jdoe@apple.com', TO_DATE('2023/10/23 12:00:00', 'yyyy/mm/dd hh:mi:ss'));
INSERT INTO Attends VALUES ('janedoe@microsoft.com', TO_DATE('2023/10/25 3:00:00', 'yyyy/mm/dd hh:mi:ss'));
INSERT INTO Attends VALUES ('jdoe@apple.com', TO_DATE('2023/11/01 9:00:00', 'yyyy/mm/dd hh:mi:ss'));
INSERT INTO Attends VALUES ('jsmth@rbc.com', TO_DATE('2023/10/10 10:30:00', 'yyyy/mm/dd hh:mi:ss'));
INSERT INTO Attends VALUES ('chrisdoe@tesla.com', TO_DATE('2023/10/16 11:00:00', 'yyyy/mm/dd hh:mi:ss'));

INSERT INTO ExperienceRequired VALUES ('Software Developer', 5, 'https://jobs.apple.com/developer');
INSERT INTO ExperienceRequired VALUES ('Software Engineer', 2, 'https://jobs.microsoft.com/senior-engineer');
INSERT INTO ExperienceRequired VALUES ('Software Engineer', 1, 'https://jobs.apple.com/senior-engineer');
INSERT INTO ExperienceRequired VALUES ('Sales Engineer', 10, 'https://jobs.apple.com/senior-engineer');
INSERT INTO ExperienceRequired VALUES ('Machine Learning Engineer', 1, 'https://jobs.microsoft.com/senior-engineer');

INSERT INTO LocatedAt VALUES ('V6T1Z4', 'https://jobs.apple.com/developer');
INSERT INTO LocatedAt VALUES ('V6B1C1', 'https://jobs.microsoft.com/senior-engineer');
INSERT INTO LocatedAt VALUES ('V6B1A9', 'https://jobs.microsoft.com/senior-engineer');
INSERT INTO LocatedAt VALUES ('M5J0E7', 'https://rbc.workday.com/backend-engineer');
INSERT INTO LocatedAt VALUES ('M5K1B7', 'https://tesla.com/opportunities/sde');

INSERT INTO SkillRequired VALUES ('https://jobs.apple.com/developer', 'Node.js');
INSERT INTO SkillRequired VALUES ('https://jobs.microsoft.com/senior-engineer', 'React.js');
INSERT INTO SkillRequired VALUES ('https://jobs.microsoft.com/senior-engineer', 'Python');
INSERT INTO SkillRequired VALUES ('https://rbc.workday.com/backend-engineer', 'C#');
INSERT INTO SkillRequired VALUES ('https://tesla.com/opportunities/sde', '.NET');
INSERT INTO SkillRequired VALUES ('https://jobs.microsoft.com/senior-engineer', 'Node.js');
INSERT INTO SkillRequired VALUES ('https://jobs.apple.com/senior-engineer', 'Node.js');
INSERT INTO SkillRequired VALUES ('https://rbc.workday.com/backend-engineer', 'Node.js');
INSERT INTO SkillRequired VALUES ('https://tesla.com/opportunities/sde', 'Node.js');

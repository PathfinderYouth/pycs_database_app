DROP DATABASE IF EXISTS project_management_system;
CREATE DATABASE project_management_system;

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin';
GRANT ALL ON project_management_system.* TO 'admin'@'localhost';
GRANT ALL ON project_management_system.* TO 'admin'@'%';

USE project_management_system;
DROP TABLE IF EXISTS PayGrade;
CREATE TABLE PayGrade(
	LabourGrade VARCHAR(4),
    ChargeRate FLOAT(5,2),
    PRIMARY KEY(LabourGrade)
);

DROP TABLE IF EXISTS Employee;
CREATE TABLE Employee(
    EmpID INT NOT NULL UNIQUE AUTO_INCREMENT,
    EmpName VARCHAR(50) NOT NULL,
    LabourGrade VARCHAR(4),
    CreatedBy INT,
    ManagedBy INT,
    TimesheetApproverID INT,
    ProfileImage TINYTEXT,
    IsHR BOOLEAN,
    IsAdmin BOOLEAN,
    IsProjectManager BOOLEAN,
    IsTimesheetApprover BOOLEAN,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PKEmployee PRIMARY KEY (EmpID),
    CONSTRAINT FKEmployeeLabourGrade
		FOREIGN KEY (LabourGrade)
			REFERENCES PayGrade(LabourGrade),
	CONSTRAINT FKEmployeeCreatedBy
		FOREIGN KEY (CreatedBy)
			REFERENCES Employee(EmpID),
	CONSTRAINT FKEmployeeManagedBy
		FOREIGN KEY (ManagedBy)
			REFERENCES Employee(EmpID),
    CONSTRAINT FKEmployeeTimesheetApproverID
		FOREIGN KEY (TimesheetApproverID)
			REFERENCES Employee(EmpID)
);

DROP TABLE IF EXISTS Credential;
CREATE TABLE Credential(
    EmpID INT NOT NULL UNIQUE,
	EmpUserName VARCHAR(10) NOT NULL UNIQUE,
    EmpPassword VARCHAR(15) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PKCredentialEmp PRIMARY KEY (EmpID),
    CONSTRAINT FKCredentialEmpID
        FOREIGN KEY (EmpID)
            REFERENCES Employee(EmpID)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS Timesheet;
CREATE TABLE Timesheet(
	TimesheetID VARCHAR(255) NOT NULL UNIQUE,
    EmpID INT NOT NULL,
	EndWeek DATE NOT NULL,
    Overtime INT,
    Flextime INT,
	Status ENUM('pending', 'submitted', 'approved', 'denied') NOT NULL DEFAULT 'pending',
    ReviewedBy INT,
    Signature TINYTEXT,
    Feedback TINYTEXT,
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ApprovedAt TIMESTAMP,
	CONSTRAINT PKTimesheet
		PRIMARY KEY (TimesheetID),
	CONSTRAINT FKTimesheetRevieweer 
		FOREIGN KEY (ReviewedBy) 
			REFERENCES Employee(EmpID),
    CONSTRAINT FKTimesheetCreator 
    	FOREIGN KEY (EmpID) 
    		REFERENCES Employee(EmpID)
			ON UPDATE CASCADE
        	ON DELETE CASCADE
);


DROP TABLE IF EXISTS LeaveRequest;
CREATE TABLE LeaveRequest(
	LeaveRequestID VARCHAR(255) NOT NULL UNIQUE,
    EmpID INT NOT NULL,
    StartDate DATE,
    EndDate DATE,
    TypeRequest VARCHAR(125),
    Descrip VARCHAR(255),
	CONSTRAINT PKLeaveRequest PRIMARY KEY (LeaveRequestID),
    CONSTRAINT FKRequestLeaveEmpID
        FOREIGN KEY (EmpID)
            REFERENCES Employee(EmpID)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS Project;
CREATE TABLE Project(
	ProjectID VARCHAR(255) NOT NULL,
	ProjectManagerID INT NOT NULL,
    ProjectName VARCHAR(100),
    Budget FLOAT(14,2),
    InitialEstimate FLOAT(14,2),
    Status ENUM('pending', 'submitted', 'open', 'closed') NOT NULL DEFAULT 'pending',
    Description TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PKProject
		PRIMARY KEY(ProjectID),
	CONSTRAINT FKProjectProjectManagerID 
		FOREIGN KEY (ProjectManagerID) REFERENCES Employee(EmpID)
			ON UPDATE CASCADE
);

DROP TABLE IF EXISTS ProjectEmployee;
CREATE TABLE ProjectEmployee(
	ProjectID VARCHAR(255) NOT NULL,
	EmpID INT,
	CONSTRAINT PKProjectEmployee
		PRIMARY KEY(ProjectID, EmpID),
	CONSTRAINT FKProjectEmployeeProjectID 
		FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
			ON UPDATE CASCADE
        	ON DELETE CASCADE,
	CONSTRAINT FKProjectEmployeeEmpID 
		FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
			ON UPDATE CASCADE
        	ON DELETE CASCADE
);

DROP TABLE IF EXISTS Report;
CREATE TABLE Report(
	ReportID VARCHAR(255) NOT NULL,
	ProjectID VARCHAR(20),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Info JSON,
	CONSTRAINT PKReport
		PRIMARY KEY(ReportID),
	CONSTRAINT FKReportProjectID 
		FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
			ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS WorkPackage;
CREATE TABLE WorkPackage(
	WorkPackageID VARCHAR(20) NOT NULL,
	ProjectID VARCHAR(20) NOT NULL,
    ParentWorkPackageID VARCHAR(20),
    ResponsibleEngineerID INT,
    WorkPackageName VARCHAR(100),
    Descrip TEXT,
    IsLowestLevel BOOLEAN DEFAULT true,
    AllocatedBudget FLOAT(14,2) DEFAULT 0,
    InitialEstimate FLOAT(14,2) DEFAULT 0,
    Charged FLOAT(14,2) DEFAULT 0,
    CostAtCompletion FLOAT(14,2) DEFAULT 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DueAt DATE,
    Stat ENUM('complete', 'open', 'closed') NOT NULL DEFAULT 'open',
	CONSTRAINT PKWorkPackage
		PRIMARY KEY(WorkPackageID, ProjectID),
	CONSTRAINT FKWorkPackageProjectID 
		FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
			ON UPDATE CASCADE
            ON DELETE CASCADE,
	CONSTRAINT FKWorkPackageParentWorkPackageID 
		FOREIGN KEY (ParentWorkPackageID, ProjectID) REFERENCES WorkPackage(WorkPackageID, ProjectID)
			ON UPDATE CASCADE
            ON DELETE CASCADE,
	CONSTRAINT FKWorkPackageResponsibleEngineerID
		FOREIGN KEY (ResponsibleEngineerID) REFERENCES Employee(EmpID)
			ON UPDATE CASCADE         
);

DROP TABLE IF EXISTS EmployeePackage;
CREATE TABLE EmployeePackage(
	WorkPackageID VARCHAR(20) NOT NULL,
	ProjectID VARCHAR(20) NOT NULL,
    EmpID INT NOT NULL,
	CONSTRAINT PKEmployeePackages
		PRIMARY KEY(WorkPackageID, ProjectID, EmpID),
	CONSTRAINT FKEmployeePackagesWorkPackageIDProjectID
		FOREIGN KEY (WorkPackageID, ProjectID) REFERENCES WorkPackage(WorkPackageID, ProjectID)
			ON UPDATE CASCADE
            ON DELETE CASCADE,
	CONSTRAINT FKEmployeePackagesEmpID
		FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
			ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS Estimate;
CREATE TABLE Estimate(
	EstimateID VARCHAR(255) NOT NULL,
    WorkPackageID VARCHAR(20) NOT NULL,
	ProjectID VARCHAR(20) NOT NULL,
    EstimateToComplete FLOAT(14,2),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PKEstimate
		PRIMARY KEY(EstimateID),
	CONSTRAINT FKEstimateWorkPackageIDProjectID 
		FOREIGN KEY (WorkPackageID, ProjectID) REFERENCES WorkPackage(WorkPackageID, ProjectID)
			ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS EstimateRow;
CREATE TABLE EstimateRow(
	EstimateID VARCHAR(255) NOT NULL,
    PayGradeID VARCHAR(4) NOT NULL,
	EmpDays FLOAT(4,2),
    EmpCount INT,
	CONSTRAINT PKEstimateRow
		PRIMARY KEY(EstimateID, PayGradeID),
	CONSTRAINT FKEstimateRowPayGradeID 
		FOREIGN KEY (PayGradeID) REFERENCES PayGrade(LabourGrade)
			ON UPDATE CASCADE,
	CONSTRAINT FKEstimateRowEstimateID 
		FOREIGN KEY (EstimateID) REFERENCES Estimate(EstimateID)
			ON UPDATE CASCADE
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS TimesheetRow;
CREATE TABLE TimesheetRow(
	TimesheetID VARCHAR(255) NOT NULL,
	ProjectID VARCHAR(20) NOT NULL,
	WorkPackageID VARCHAR(20) NOT NULL,
	Notes TINYTEXT,
	Hours BIGINT NOT NULL,
	CONSTRAINT PKTimesheetRow
		PRIMARY KEY(ProjectID, WorkPackageID, TimesheetID),
	CONSTRAINT FKTimesheetRowTimesheetID 
		FOREIGN KEY (TimesheetID) REFERENCES Timesheet(TimesheetID)
			ON UPDATE CASCADE
        	ON DELETE CASCADE,
	CONSTRAINT FKTimesheetRowWorkPackageIDProjectID
		FOREIGN KEY (WorkPackageID, ProjectID) REFERENCES WorkPackage(WorkPackageID, ProjectID)
);

INSERT INTO PayGrade (LabourGrade, ChargeRate) VALUES ("PS", 3.50);

INSERT INTO Employee (EmpID, EmpName, LabourGrade, TimesheetApproverID, IsHR, IsAdmin, IsProjectManager, IsTimesheetApprover)
 VALUES (1, "Bruce Link",  "PS", NULL, TRUE, TRUE, TRUE, TRUE);
INSERT INTO Employee (EmpID, EmpName, LabourGrade, ManagedBy, TimesheetApproverID, IsHR, IsAdmin, IsProjectManager, IsTimesheetApprover)
 VALUES (2, "Yogesh Verma",  "PS", 1, 1, TRUE, FALSE, FALSE, TRUE);

INSERT INTO Credential (EmpID, EmpUserName, EmpPassword) VALUES (1, "bdlink", "bruce");
INSERT INTO Credential (EmpID, EmpUserName, EmpPassword) VALUES (2, "yogiduzit", "yogesh");

INSERT INTO Timesheet (TimesheetID, EmpID, EndWeek) VALUES ("55000000-0000-0000-0000-000000000000", 1, DATE '2000/3/10');
INSERT INTO Timesheet (TimesheetID, EmpID, EndWeek) VALUES ("26000000-0000-0000-0000-000000000000", 1, DATE '2000/3/17');
INSERT INTO Timesheet (TimesheetID, EmpID, EndWeek) VALUES ("45700000-0000-0000-0000-000000000000", 2, DATE '2000/3/24');

INSERT INTO LeaveRequest VALUES ("31324000-0000-0000-0000-000000000000", 1, DATE '2021/3/10', DATE '2021/4/18', "Medical", "Going to the dentist");

INSERT INTO Project (ProjectID, ProjectManagerID, ProjectName, Budget, InitialEstimate, Description, Status) VALUES ("PR123", 1, "Stormfront", 100000.00, 90000.00, "A really cool project that should get an A", 'pending');

INSERT INTO WorkPackage (WorkPackageID, ProjectID, ResponsibleEngineerID, WorkPackageName, Descrip, IsLowestLevel, AllocatedBudget, InitialEstimate, DueAt, Stat) VALUES ("WP1.1", "PR123", 2, "DDL Creation", "Make a ddl", TRUE, 100.00, 89.00, DATE '2021/5/21', 'open');

INSERT INTO ProjectEmployee VALUES("PR123", 1);
INSERT INTO ProjectEmployee VALUES("PR123", 2);

INSERT INTO EmployeePackage VALUES("WP1.1",  "PR123", 2);

INSERT INTO Estimate (EstimateID, WorkPackageID, ProjectID) VALUES ("83400000-0000-0000-0000-000000000000", "WP1.1", "PR123");

INSERT INTO EstimateRow VALUES("83400000-0000-0000-0000-000000000000", "PS", 2.5, 50);

INSERT INTO Report (ReportID, ProjectID, Info) VALUES("13400090-0000-0000-0000-000000000000", "PR123", '{
"StatusReport":{ "Type":"weekly", "Date":"2021/2/12", "data":{"EmpID": "32000000-0000-0000-0000-000000000000",
 "ProjectID":"PR123", "WorkPackage":"WP1.1", "Hours":"12"}}}');

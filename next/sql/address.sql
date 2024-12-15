-- DROP TABLE Addresses;

-- CREATE TABLE Addresses (
--   ID INTEGER PRIMARY KEY,
--   Country VARCHAR(25) NOT NULL,
--   City VARCHAR(25) NOT NULL,
--   Street VARCHAR(25) NOT NULL,
--   StreetNumber INTEGER NOT NULL CHECK (StreetNumber > 0),
--   EmployeeID INTEGER NOT NULL,
--   FOREIGN KEY(EmployeeID) REFERENCES Employees(EmployeeID)
-- );

-- DELETE FROM Addresses;

INSERT INTO Addresses (
    ID, City, Country,Street, StreetNumber, EmployeeID
) VALUES (1, 'Novi Pazar', 'Srbija', 'Ulica Stevana Nemanje', 27, 7);

SELECT * FROM Addresses;

SELECT Employees.EmployeeID, LastName, FirstName FROM Employees
  INNER JOIN Addresses
  ON Addresses.EmployeeID = Employees.EmployeeID;

-- Either:
--     Open Microsoft SQL Server Management Studio.
--     Connect to your server.
--     Open a new query window.
--     Copy and paste the SQL below into the query window.
--     Execute the script to create the Northwind database.
-- Or:
--     Run the following command in a terminal window.
--     sqlcmd
--     Copy and paste the SQL below into the terminal window to create the Northwind database.

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Northwind')
CREATE DATABASE Northwind
GO

USE Northwind
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderDetails')
DROP TABLE OrderDetails
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Orders')
DROP TABLE Orders
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products')
DROP TABLE Products
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
DROP TABLE Categories
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Customers')
DROP TABLE Customers
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Employees')
DROP TABLE Employees
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Shippers')
DROP TABLE Shippers
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Suppliers')
DROP TABLE Suppliers
GO

CREATE TABLE Categories
(      
    CategoryID INTEGER PRIMARY KEY IDENTITY(1,1),
    CategoryName VARCHAR(25),
    Description VARCHAR(255)
)
GO

CREATE TABLE Customers
(      
    CustomerID INTEGER PRIMARY KEY IDENTITY(1,1),
    CustomerName VARCHAR(50),
    ContactName VARCHAR(50),
    Address VARCHAR(50),
    City VARCHAR(20),
    PostalCode VARCHAR(10),
    Country VARCHAR(15)
);
GO

CREATE TABLE Employees
(
    EmployeeID INTEGER PRIMARY KEY IDENTITY(1,1),
    LastName VARCHAR(15),
    FirstName VARCHAR(15),
    BirthDate DATETIME,
    Photo VARCHAR(25),
    Notes VARCHAR(1024)
);
GO

CREATE TABLE Shippers(
    ShipperID INTEGER PRIMARY KEY IDENTITY(1,1),
    ShipperName VARCHAR(25),
    Phone VARCHAR(15)
);
GO

CREATE TABLE Suppliers(
    SupplierID INTEGER PRIMARY KEY IDENTITY(1,1),
    SupplierName VARCHAR(50),
    ContactName VARCHAR(50),
    Address VARCHAR(50),
    City VARCHAR(20),
    PostalCode VARCHAR(10),
    Country VARCHAR(15),
    Phone VARCHAR(15)
);
GO

CREATE TABLE Products(
    ProductID INTEGER PRIMARY KEY IDENTITY(1,1),
    ProductName VARCHAR(50),
    SupplierID INTEGER,
    CategoryID INTEGER,
    Unit VARCHAR(25),
    Price NUMERIC,
	FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID),
	FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID)
);
GO

CREATE TABLE Orders(
    OrderID INTEGER PRIMARY KEY IDENTITY(10248,1),
    CustomerID INTEGER,
    EmployeeID INTEGER,
    OrderDate DATETIME,
    ShipperID INTEGER,
    FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID),
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
    FOREIGN KEY (ShipperID) REFERENCES Shippers (ShipperID)
);
GO

CREATE TABLE OrderDetails(
    OrderDetailID INTEGER PRIMARY KEY IDENTITY(1,1),
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
	FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
	FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);
GO

INSERT INTO Categories VALUES('Beverages','Soft drinks, coffees, teas, beers, and ales');
INSERT INTO Categories VALUES('Condiments','Sweet and savory sauces, relishes, spreads, and seasonings');
INSERT INTO Categories VALUES('Confections','Desserts, candies, and sweet breads');
INSERT INTO Categories VALUES('Dairy Products','Cheeses');
INSERT INTO Categories VALUES('Grains/Cereals','Breads, crackers, pasta, and cereal');
INSERT INTO Categories VALUES('Meat/Poultry','Prepared meats');
INSERT INTO Categories VALUES('Produce','Dried fruit and bean curd');
INSERT INTO Categories VALUES('Seafood','Seaweed and fish');
GO

INSERT INTO Customers VALUES('Alfreds Futterkiste','Maria Anders','Obere Str. 57','Berlin','12209','Germany');
INSERT INTO Customers VALUES('Ana Trujillo Emparedados y helados','Ana Trujillo','Avda. de la Constitución 2222','México D.F.','5021','Mexico');
INSERT INTO Customers VALUES('Antonio Moreno Taquería','Antonio Moreno','Mataderos 2312','México D.F.','5023','Mexico');
INSERT INTO Customers VALUES('Around the Horn','Thomas Hardy','120 Hanover Sq.','London','WA1 1DP','UK');
INSERT INTO Customers VALUES('Berglunds snabbköp','Christina Berglund','Berguvsvägen 8','Luleå','S-958 22','Sweden');
INSERT INTO Customers VALUES('Blauer See Delikatessen','Hanna Moos','Forsterstr. 57','Mannheim','68306','Germany');
INSERT INTO Customers VALUES('Blondel père et fils','Frédérique Citeaux','24, place Kléber','Strasbourg','67000','France');
INSERT INTO Customers VALUES('Bólido Comidas preparadas','Martín Sommer','C/ Araquil, 67','Madrid','28023','Spain');
INSERT INTO Customers VALUES('Bon app''''','Laurence Lebihans','12, rue des Bouchers','Marseille','13008','France');
INSERT INTO Customers VALUES('Bottom-Dollar Marketse','Elizabeth Lincoln','23 Tsawassen Blvd.','Tsawassen','T2F 8M4','Canada');
INSERT INTO Customers VALUES('B''''s Beverages','Victoria Ashworth','Fauntleroy Circus','London','EC2 5NT','UK');
INSERT INTO Customers VALUES('Cactus Comidas para llevar','Patricio Simpson','Cerrito 333','Buenos Aires','1010','Argentina');
INSERT INTO Customers VALUES('Centro comercial Moctezuma','Francisco Chang','Sierras de Granada 9993','México D.F.','5022','Mexico');
INSERT INTO Customers VALUES('Chop-suey Chinese','Yang Wang','Hauptstr. 29','Bern','3012','Switzerland');
INSERT INTO Customers VALUES('Comércio Mineiro','Pedro Afonso','Av. dos Lusíadas, 23','São Paulo','05432-043','Brazil');
INSERT INTO Customers VALUES('Consolidated Holdings','Elizabeth Brown','Berkeley Gardens 12 Brewery','London','WX1 6LT','UK');
INSERT INTO Customers VALUES('Drachenblut Delikatessend','Sven Ottlieb','Walserweg 21','Aachen','52066','Germany');
INSERT INTO Customers VALUES('Du monde entier','Janine Labrune','67, rue des Cinquante Otages','Nantes','44000','France');
INSERT INTO Customers VALUES('Eastern Connection','Ann Devon','35 King George','London','WX3 6FW','UK');
INSERT INTO Customers VALUES('Ernst Handel','Roland Mendel','Kirchgasse 6','Graz','8010','Austria');
INSERT INTO Customers VALUES('Familia Arquibaldo','Aria Cruz','Rua Orós, 92','São Paulo','05442-030','Brazil');
INSERT INTO Customers VALUES('FISSA Fabrica Inter. Salchichas S.A.','Diego Roel','C/ Moralzarzal, 86','Madrid','28034','Spain');
INSERT INTO Customers VALUES('Folies gourmandes','Martine Rancé','184, chaussée de Tournai','Lille','59000','France');
INSERT INTO Customers VALUES('Folk och fä HB','Maria Larsson','Åkergatan 24','Bräcke','S-844 67','Sweden');
INSERT INTO Customers VALUES('Frankenversand','Peter Franken','Berliner Platz 43','München','80805','Germany');
INSERT INTO Customers VALUES('France restauration','Carine Schmitt','54, rue Royale','Nantes','44000','France');
INSERT INTO Customers VALUES('Franchi S.p.A.','Paolo Accorti','Via Monte Bianco 34','Torino','10100','Italy');
INSERT INTO Customers VALUES('Furia Bacalhau e Frutos do Mar','Lino Rodriguez','Jardim das rosas n. 32','Lisboa','1675','Portugal');
INSERT INTO Customers VALUES('Galería del gastrónomo','Eduardo Saavedra','Rambla de Cataluña, 23','Barcelona','8022','Spain');
INSERT INTO Customers VALUES('Godos Cocina Típica','José Pedro Freyre','C/ Romero, 33','Sevilla','41101','Spain');
INSERT INTO Customers VALUES('Gourmet Lanchonetes','André Fonseca','Av. Brasil, 442','Campinas','04876-786','Brazil');
INSERT INTO Customers VALUES('Great Lakes Food Market','Howard Snyder','2732 Baker Blvd.','Eugene','97403','USA');
INSERT INTO Customers VALUES('GROSELLA-Restaurante','Manuel Pereira','5ª Ave. Los Palos Grandes','Caracas','1081','Venezuela');
INSERT INTO Customers VALUES('Hanari Carnes','Mario Pontes','Rua do Paço, 67','Rio de Janeiro','05454-876','Brazil');
INSERT INTO Customers VALUES('HILARIÓN-Abastos','Carlos Hernández','Carrera 22 con Ave. Carlos Soublette #8-35','San Cristóbal','5022','Venezuela');
INSERT INTO Customers VALUES('Hungry Coyote Import Store','Yoshi Latimer','City Center Plaza 516 Main St.','Elgin','97827','USA');
INSERT INTO Customers VALUES('Hungry Owl All-Night Grocers','Patricia McKenna','8 Johnstown Road','Cork','','Ireland');
INSERT INTO Customers VALUES('Island Trading','Helen Bennett','Garden House Crowther Way','Cowes','PO31 7PJ','UK');
INSERT INTO Customers VALUES('Königlich Essen','Philip Cramer','Maubelstr. 90','Brandenburg','14776','Germany');
INSERT INTO Customers VALUES('La corne d''''abondance','Daniel Tonini','67, avenue de l''''Europe','Versailles','78000','France');
INSERT INTO Customers VALUES('La maison d''''Asie','Annette Roulet','1 rue Alsace-Lorraine','Toulouse','31000','France');
INSERT INTO Customers VALUES('Laughing Bacchus Wine Cellars','Yoshi Tannamuri','1900 Oak St.','Vancouver','V3F 2K1','Canada');
INSERT INTO Customers VALUES('Lazy K Kountry Store','John Steel','12 Orchestra Terrace','Walla Walla','99362','USA');
INSERT INTO Customers VALUES('Lehmanns Marktstand','Renate Messner','Magazinweg 7','Frankfurt a.M.','60528','Germany');
INSERT INTO Customers VALUES('Let''''s Stop N Shop','Jaime Yorres','87 Polk St. Suite 5','San Francisco','94117','USA');
INSERT INTO Customers VALUES('LILA-Supermercado','Carlos González','Carrera 52 con Ave. Bolívar #65-98 Llano Largo','Barquisimeto','3508','Venezuela');
INSERT INTO Customers VALUES('LINO-Delicateses','Felipe Izquierdo','Ave. 5 de Mayo Porlamar','I. de Margarita','4980','Venezuela');
INSERT INTO Customers VALUES('Lonesome Pine Restaurant','Fran Wilson','89 Chiaroscuro Rd.','Portland','97219','USA');
INSERT INTO Customers VALUES('Magazzini Alimentari Riuniti','Giovanni Rovelli','Via Ludovico il Moro 22','Bergamo','24100','Italy');
INSERT INTO Customers VALUES('Maison Dewey','Catherine Dewey','Rue Joseph-Bens 532','Bruxelles','B-1180','Belgium');
INSERT INTO Customers VALUES('Mère Paillarde','Jean Fresnière','43 rue St. Laurent','Montréal','H1J 1C3','Canada');
INSERT INTO Customers VALUES('Morgenstern Gesundkost','Alexander Feuer','Heerstr. 22','Leipzig','4179','Germany');
INSERT INTO Customers VALUES('North/South','Simon Crowther','South House 300 Queensbridge','London','SW7 1RZ','UK');
INSERT INTO Customers VALUES('Océano Atlántico Ltda.','Yvonne Moncada','Ing. Gustavo Moncada 8585 Piso 20-A','Buenos Aires','1010','Argentina');
INSERT INTO Customers VALUES('Old World Delicatessen','Rene Phillips','2743 Bering St.','Anchorage','99508','USA');
INSERT INTO Customers VALUES('Ottilies Käseladen','Henriette Pfalzheim','Mehrheimerstr. 369','Köln','50739','Germany');
INSERT INTO Customers VALUES('Paris spécialités','Marie Bertrand','265, boulevard Charonne','Paris','75012','France');
INSERT INTO Customers VALUES('Pericles Comidas clásicas','Guillermo Fernández','Calle Dr. Jorge Cash 321','México D.F.','5033','Mexico');
INSERT INTO Customers VALUES('Piccolo und mehr','Georg Pipps','Geislweg 14','Salzburg','5020','Austria');
INSERT INTO Customers VALUES('Princesa Isabel Vinhoss','Isabel de Castro','Estrada da saúde n. 58','Lisboa','1756','Portugal');
INSERT INTO Customers VALUES('Que Delícia','Bernardo Batista','Rua da Panificadora, 12','Rio de Janeiro','02389-673','Brazil');
INSERT INTO Customers VALUES('Queen Cozinha','Lúcia Carvalho','Alameda dos Canàrios, 891','São Paulo','05487-020','Brazil');
INSERT INTO Customers VALUES('QUICK-Stop','Horst Kloss','Taucherstraße 10','Cunewalde','1307','Germany');
INSERT INTO Customers VALUES('Rancho grande','Sergio Gutiérrez','Av. del Libertador 900','Buenos Aires','1010','Argentina');
INSERT INTO Customers VALUES('Rattlesnake Canyon Grocery','Paula Wilson','2817 Milton Dr.','Albuquerque','87110','USA');
INSERT INTO Customers VALUES('Reggiani Caseifici','Maurizio Moroni','Strada Provinciale 124','Reggio Emilia','42100','Italy');
INSERT INTO Customers VALUES('Ricardo Adocicados','Janete Limeira','Av. Copacabana, 267','Rio de Janeiro','02389-890','Brazil');
INSERT INTO Customers VALUES('Richter Supermarkt','Michael Holz','Grenzacherweg 237','Genève','1203','Switzerland');
INSERT INTO Customers VALUES('Romero y tomillo','Alejandra Camino','Gran Vía, 1','Madrid','28001','Spain');
INSERT INTO Customers VALUES('Santé Gourmet','Jonas Bergulfsen','Erling Skakkes gate 78','Stavern','4110','Norway');
INSERT INTO Customers VALUES('Save-a-lot Markets','Jose Pavarotti','187 Suffolk Ln.','Boise','83720','USA');
INSERT INTO Customers VALUES('Seven Seas Imports','Hari Kumar','90 Wadhurst Rd.','London','OX15 4NB','UK');
INSERT INTO Customers VALUES('Simons bistro','Jytte Petersen','Vinbæltet 34','København','1734','Denmark');
INSERT INTO Customers VALUES('Spécialités du monde','Dominique Perrier','25, rue Lauriston','Paris','75016','France');
INSERT INTO Customers VALUES('Split Rail Beer & Ale','Art Braunschweiger','P.O. Box 555','Lander','82520','USA');
INSERT INTO Customers VALUES('Suprêmes délices','Pascale Cartrain','Boulevard Tirou, 255','Charleroi','B-6000','Belgium');
INSERT INTO Customers VALUES('The Big Cheese','Liz Nixon','89 Jefferson Way Suite 2','Portland','97201','USA');
INSERT INTO Customers VALUES('The Cracker Box','Liu Wong','55 Grizzly Peak Rd.','Butte','59801','USA');
INSERT INTO Customers VALUES('Toms Spezialitäten','Karin Josephs','Luisenstr. 48','Münster','44087','Germany');
INSERT INTO Customers VALUES('Tortuga Restaurante','Miguel Angel Paolino','Avda. Azteca 123','México D.F.','5033','Mexico');
INSERT INTO Customers VALUES('Tradição Hipermercados','Anabela Domingues','Av. Inês de Castro, 414','São Paulo','05634-030','Brazil');
INSERT INTO Customers VALUES('Trail''''s Head Gourmet Provisioners','Helvetius Nagy','722 DaVinci Blvd.','Kirkland','98034','USA');
INSERT INTO Customers VALUES('Vaffeljernet','Palle Ibsen','Smagsløget 45','Århus','8200','Denmark');
INSERT INTO Customers VALUES('Victuailles en stock','Mary Saveley','2, rue du Commerce','Lyon','69004','France');
INSERT INTO Customers VALUES('Vins et alcools Chevalier','Paul Henriot','59 rue de l''''Abbaye','Reims','51100','France');
INSERT INTO Customers VALUES('Die Wandernde Kuh','Rita Müller','Adenauerallee 900','Stuttgart','70563','Germany');
INSERT INTO Customers VALUES('Wartian Herkku','Pirkko Koskitalo','Torikatu 38','Oulu','90110','Finland');
INSERT INTO Customers VALUES('Wellington Importadora','Paula Parente','Rua do Mercado, 12','Resende','08737-363','Brazil');
INSERT INTO Customers VALUES('White Clover Markets','Karl Jablonski','305 - 14th Ave. S. Suite 3B','Seattle','98128','USA');
INSERT INTO Customers VALUES('Wilman Kala','Matti Karttunen','Keskuskatu 45','Helsinki','21240','Finland');
INSERT INTO Customers VALUES('Wolski','Zbyszek','ul. Filtrowa 68','Walla','01-012','Poland');

GO
INSERT INTO Employees VALUES('Davolio','Nancy','1968-12-08','EmpID1.pic','Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of ''Toastmasters International''.');
INSERT INTO Employees VALUES('Fuller','Andrew','1952-02-19','EmpID2.pic','Andrew received his BTS commercial and a Ph.D. in international marketing from the University of Dallas. He is fluent in French and Italian and reads German. He joined the company as a sales representative, was promoted to sales manager and was then named vice president of sales. Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.');
INSERT INTO Employees VALUES('Leverling','Janet','1963-08-30','EmpID3.pic','Janet has a BS degree in chemistry from Boston College). She has also completed a certificate program in food retailing management. Janet was hired as a sales associate and was promoted to sales representative.');
INSERT INTO Employees VALUES('Peacock','Margaret','1958-09-19','EmpID4.pic','Margaret holds a BA in English literature from Concordia College and an MA from the American Institute of Culinary Arts. She was temporarily assigned to the London office before returning to her permanent post in Seattle.');
INSERT INTO Employees VALUES('Buchanan','Steven','1955-03-04','EmpID5.pic','Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree. Upon joining the company as a sales representative, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London, where he was promoted to sales manager. Mr. Buchanan has completed the courses ''Successful Telemarketing'' and ''International Sales Management''. He is fluent in French.');
INSERT INTO Employees VALUES('Suyama','Michael','1963-07-02','EmpID6.pic','Michael is a graduate of Sussex University (MA, economics) and the University of California at Los Angeles (MBA, marketing). He has also taken the courses ''Multi-Cultural Selling'' and ''Time Management for the Sales Professional''. He is fluent in Japanese and can read and write French, Portuguese, and Spanish.');
INSERT INTO Employees VALUES('King','Robert','1960-05-29','EmpID7.pic','Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan and then joining the company. After completing a course entitled ''Selling in Europe'', he was transferred to the London office.');
INSERT INTO Employees VALUES('Callahan','Laura','1958-01-09','EmpID8.pic','Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French.');
INSERT INTO Employees VALUES('Dodsworth','Anne','1969-07-02','EmpID9.pic','Anne has a BA degree in English from St. Lawrence College. She is fluent in French and German.');
INSERT INTO Employees VALUES('West','Adam','1928-09-19','EmpID10.pic','An old chum.');
GO

INSERT INTO Shippers VALUES( 'Speedy Express', '(503) 555-9831');
INSERT INTO Shippers VALUES( 'United Package', '(503) 555-3199');
INSERT INTO Shippers VALUES( 'Federal Shipping', '(503) 555-9931');
GO

INSERT INTO Suppliers VALUES('Exotic Liquid','Charlotte Cooper','49 Gilbert St.','Londona','EC1 4SD','UK','(171) 555-2222');
INSERT INTO Suppliers VALUES('New Orleans Cajun Delights','Shelley Burke','P.O. Box 78934','New Orleans','70117','USA','(100) 555-4822');
INSERT INTO Suppliers VALUES('Grandma Kelly''s Homestead','Regina Murphy','707 Oxford Rd.','Ann Arbor','48104','USA','(313) 555-5735');
INSERT INTO Suppliers VALUES('Tokyo Traders','Yoshi Nagase','9-8 Sekimai Musashino-shi','Tokyo','100','Japan','(03) 3555-5011');
INSERT INTO Suppliers VALUES('Cooperativa de Quesos ''Las Cabras''','Antonio del Valle Saavedra','Calle del Rosal 4','Oviedo','33007','Spain','(98) 598 76 54');
INSERT INTO Suppliers VALUES('Mayumi''s','Mayumi Ohno','92 Setsuko Chuo-ku','Osaka','545','Japan','(06) 431-7877');
INSERT INTO Suppliers VALUES('Pavlova, Ltd.','Ian Devling','74 Rose St. Moonie Ponds','Melbourne','3058','Australia','(03) 444-2343');
INSERT INTO Suppliers VALUES('Specialty Biscuits, Ltd.','Peter Wilson','29 King''s Way','Manchester','M14 GSD','UK','(161) 555-4448');
INSERT INTO Suppliers VALUES('PB Knäckebröd AB','Lars Peterson','Kaloadagatan 13','Göteborg','S-345 67','Sweden','031-987 65 43');
INSERT INTO Suppliers VALUES('Refrescos Americanas LTDA','Carlos Diaz','Av. das Americanas 12.890','São Paulo','5442','Brazil','(11) 555 4640');
INSERT INTO Suppliers VALUES('Heli Süßwaren GmbH & Co. KG','Petra Winkler','Tiergartenstraße 5','Berlin','10785','Germany','(010) 9984510');
INSERT INTO Suppliers VALUES('Plutzer Lebensmittelgroßmärkte AG','Martin Bein','Bogenallee 51','Frankfurt','60439','Germany','(069) 992755');
INSERT INTO Suppliers VALUES('Nord-Ost-Fisch Handelsgesellschaft mbH','Sven Petersen','Frahmredder 112a','Cuxhaven','27478','Germany','(04721) 8713');
INSERT INTO Suppliers VALUES('Formaggi Fortini s.r.l.','Elio Rossi','Viale Dante, 75','Ravenna','48100','Italy','(0544) 60323');
INSERT INTO Suppliers VALUES('Norske Meierier','Beate Vileid','Hatlevegen 5','Sandvika','1320','Norway','(0)2-953010');
INSERT INTO Suppliers VALUES('Bigfoot Breweries','Cheryl Saylor','3400 - 8th Avenue Suite 210','Bend','97101','USA','(503) 555-9931');
INSERT INTO Suppliers VALUES('Svensk Sjöföda AB','Michael Björn','Brovallavägen 231','Stockholm','S-123 45','Sweden','08-123 45 67');
INSERT INTO Suppliers VALUES('Aux joyeux ecclésiastiques','Guylène Nodier','203, Rue des Francs-Bourgeois','Paris','75004','France','(1) 03.83.00.68');
INSERT INTO Suppliers VALUES('New England Seafood Cannery','Robb Merchant','Order Processing Dept. 2100 Paul Revere Blvd.','Boston','2134','USA','(617) 555-3267');
INSERT INTO Suppliers VALUES('Leka Trading','Chandra Leka','471 Serangoon Loop, Suite #402','Singapore','512','Singapore','555-8787');
INSERT INTO Suppliers VALUES('Lyngbysild','Niels Petersen','Lyngbysild Fiskebakken 10','Lyngby','2800','Denmark','43844108');
INSERT INTO Suppliers VALUES('Zaanse Snoepfabriek','Dirk Luchte','Verkoop Rijnweg 22','Zaandam','9999 ZZ','Netherlands','(12345) 1212');
INSERT INTO Suppliers VALUES('Karkki Oy','Anne Heikkonen','Valtakatu 12','Lappeenranta','53120','Finland','(953) 10956');
INSERT INTO Suppliers VALUES('G''day, Mate','Wendy Mackenzie','170 Prince Edward Parade Hunter''s Hill','Sydney','2042','Australia','(02) 555-5914');
INSERT INTO Suppliers VALUES('Ma Maison','Jean-Guy Lauzon','2960 Rue St. Laurent','Montréal','H1J 1C3','Canada','(514) 555-9022');
INSERT INTO Suppliers VALUES('Pasta Buttini s.r.l.','Giovanni Giudici','Via dei Gelsomini, 153','Salerno','84100','Italy','(089) 6547665');
INSERT INTO Suppliers VALUES('Escargots Nouveaux','Marie Delamare','22, rue H. Voiron','Montceau','71300','France','85.57.00.07');
INSERT INTO Suppliers VALUES('Gai pâturage','Eliane Noz','Bat. B 3, rue des Alpes','Annecy','74000','France','38.76.98.06');
INSERT INTO Suppliers VALUES('Forêts d''érables','Chantal Goulet','148 rue Chasseur','Ste-Hyacinthe','J2S 7S8','Canada','(514) 555-2955');
GO

INSERT INTO Products VALUES('Chais',1,1,'10 boxes x 20 bags',18);
INSERT INTO Products VALUES('Chang',1,1,'24 - 12 oz bottles',19);
INSERT INTO Products VALUES('Aniseed Syrup',1,2,'12 - 550 ml bottles',10);
INSERT INTO Products VALUES('Chef Anton''s Cajun Seasoning',2,2,'48 - 6 oz jars',22);
INSERT INTO Products VALUES('Chef Anton''s Gumbo Mix',2,2,'36 boxes',21.35);
INSERT INTO Products VALUES('Grandma''s Boysenberry Spread',3,2,'12 - 8 oz jars',25);
INSERT INTO Products VALUES('Uncle Bob''s Organic Dried Pears',3,7,'12 - 1 lb pkgs.',30);
INSERT INTO Products VALUES('Northwoods Cranberry Sauce',3,2,'12 - 12 oz jars',40);
INSERT INTO Products VALUES('Mishi Kobe Niku',4,6,'18 - 500 g pkgs.',97);
INSERT INTO Products VALUES('Ikura',4,8,'12 - 200 ml jars',31);
INSERT INTO Products VALUES('Queso Cabrales',5,4,'1 kg pkg.',21);
INSERT INTO Products VALUES('Queso Manchego La Pastora',5,4,'10 - 500 g pkgs.',38);
INSERT INTO Products VALUES('Konbu',6,8,'2 kg box',6);
INSERT INTO Products VALUES('Tofu',6,7,'40 - 100 g pkgs.',23.25);
INSERT INTO Products VALUES('Genen Shouyu',6,2,'24 - 250 ml bottles',15.5);
INSERT INTO Products VALUES('Pavlova',7,3,'32 - 500 g boxes',17.45);
INSERT INTO Products VALUES('Alice Mutton',7,6,'20 - 1 kg tins',39);
INSERT INTO Products VALUES('Carnarvon Tigers',7,8,'16 kg pkg.',62.5);
INSERT INTO Products VALUES('Teatime Chocolate Biscuits',8,3,'10 boxes x 12 pieces',9.2);
INSERT INTO Products VALUES('Sir Rodney''s Marmalade',8,3,'30 gift boxes',81);
INSERT INTO Products VALUES('Sir Rodney''s Scones',8,3,'24 pkgs. x 4 pieces',10);
INSERT INTO Products VALUES('Gustaf''s Knäckebröd',9,5,'24 - 500 g pkgs.',21);
INSERT INTO Products VALUES('Tunnbröd',9,5,'12 - 250 g pkgs.',9);
INSERT INTO Products VALUES('Guaraná Fantástica',10,1,'12 - 355 ml cans',4.5);
INSERT INTO Products VALUES('NuNuCa Nuß-Nougat-Creme',11,3,'20 - 450 g glasses',14);
INSERT INTO Products VALUES('Gumbär Gummibärchen',11,3,'100 - 250 g bags',31.23);
INSERT INTO Products VALUES('Schoggi Schokolade',11,3,'100 - 100 g pieces',43.9);
INSERT INTO Products VALUES('Rössle Sauerkraut',12,7,'25 - 825 g cans',45.6);
INSERT INTO Products VALUES('Thüringer Rostbratwurst',12,6,'50 bags x 30 sausgs.',123.79);
INSERT INTO Products VALUES('Nord-Ost Matjeshering',13,8,'10 - 200 g glasses',25.89);
INSERT INTO Products VALUES('Gorgonzola Telino',14,4,'12 - 100 g pkgs',12.5);
INSERT INTO Products VALUES('Mascarpone Fabioli',14,4,'24 - 200 g pkgs.',32);
INSERT INTO Products VALUES('Geitost',15,4,'500 g',2.5);
INSERT INTO Products VALUES('Sasquatch Ale',16,1,'24 - 12 oz bottles',14);
INSERT INTO Products VALUES('Steeleye Stout',16,1,'24 - 12 oz bottles',18);
INSERT INTO Products VALUES('Inlagd Sill',17,8,'24 - 250 g jars',19);
INSERT INTO Products VALUES('Gravad lax',17,8,'12 - 500 g pkgs.',26);
INSERT INTO Products VALUES('Côte de Blaye',18,1,'12 - 75 cl bottles',263.5);
INSERT INTO Products VALUES('Chartreuse verte',18,1,'750 cc per bottle',18);
INSERT INTO Products VALUES('Boston Crab Meat',19,8,'24 - 4 oz tins',18.4);
INSERT INTO Products VALUES('Jack''s New England Clam Chowder',19,8,'12 - 12 oz cans',9.65);
INSERT INTO Products VALUES('Singaporean Hokkien Fried Mee',20,5,'32 - 1 kg pkgs.',14);
INSERT INTO Products VALUES('Ipoh Coffee',20,1,'16 - 500 g tins',46);
INSERT INTO Products VALUES('Gula Malacca',20,2,'20 - 2 kg bags',19.45);
INSERT INTO Products VALUES('Røgede sild',21,8,'1k pkg.',9.5);
INSERT INTO Products VALUES('Spegesild',21,8,'4 - 450 g glasses',12);
INSERT INTO Products VALUES('Zaanse koeken',22,3,'10 - 4 oz boxes',9.5);
INSERT INTO Products VALUES('Chocolade',22,3,'10 pkgs.',12.75);
INSERT INTO Products VALUES('Maxilaku',23,3,'24 - 50 g pkgs.',20);
INSERT INTO Products VALUES('Valkoinen suklaa',23,3,'12 - 100 g bars',16.25);
INSERT INTO Products VALUES('Manjimup Dried Apples',24,7,'50 - 300 g pkgs.',53);
INSERT INTO Products VALUES('Filo Mix',24,5,'16 - 2 kg boxes',7);
INSERT INTO Products VALUES('Perth Pasties',24,6,'48 pieces',32.8);
INSERT INTO Products VALUES('Tourtière',25,6,'16 pies',7.45);
INSERT INTO Products VALUES('Pâté chinois',25,6,'24 boxes x 2 pies',24);
INSERT INTO Products VALUES('Gnocchi di nonna Alice',26,5,'24 - 250 g pkgs.',38);
INSERT INTO Products VALUES('Ravioli Angelo',26,5,'24 - 250 g pkgs.',19.5);
INSERT INTO Products VALUES('Escargots de Bourgogne',27,8,'24 pieces',13.25);
INSERT INTO Products VALUES('Raclette Courdavault',28,4,'5 kg pkg.',55);
INSERT INTO Products VALUES('Camembert Pierrot',28,4,'15 - 300 g rounds',34);
INSERT INTO Products VALUES('Sirop d''érable',29,2,'24 - 500 ml bottles',28.5);
INSERT INTO Products VALUES('Tarte au sucre',29,3,'48 pies',49.3);
INSERT INTO Products VALUES('Vegie-spread',7,2,'15 - 625 g jars',43.9);
INSERT INTO Products VALUES('Wimmers gute Semmelknödel',12,5,'20 bags x 4 pieces',33.25);
INSERT INTO Products VALUES('Louisiana Fiery Hot Pepper Sauce',2,2,'32 - 8 oz bottles',21.05);
INSERT INTO Products VALUES('Louisiana Hot Spiced Okra',2,2,'24 - 8 oz jars',17);
INSERT INTO Products VALUES('Laughing Lumberjack Lager',16,1,'24 - 12 oz bottles',14);
INSERT INTO Products VALUES('Scottish Longbreads',8,3,'10 boxes x 8 pieces',12.5);
INSERT INTO Products VALUES('Gudbrandsdalsost',15,4,'10 kg pkg.',36);
INSERT INTO Products VALUES('Outback Lager',7,1,'24 - 355 ml bottles',15);
INSERT INTO Products VALUES('Fløtemysost',15,4,'10 - 500 g pkgs.',21.5);
INSERT INTO Products VALUES('Mozzarella di Giovanni',14,4,'24 - 200 g pkgs.',34.8);
INSERT INTO Products VALUES('Röd Kaviar',17,8,'24 - 150 g jars',15);
INSERT INTO Products VALUES('Longlife Tofu',4,7,'5 kg pkg.',10);
INSERT INTO Products VALUES('Rhönbräu Klosterbier',12,1,'24 - 0.5 l bottles',7.75);
INSERT INTO Products VALUES('Lakkalikööri',23,1,'500 ml',18);
INSERT INTO Products VALUES('Original Frankfurter grüne Soße',12,2,'12 boxes',13);
GO

INSERT INTO Orders VALUES(90,5,'1996-07-04',3);
INSERT INTO Orders VALUES(81,6,'1996-07-05',1);
INSERT INTO Orders VALUES(34,4,'1996-07-08',2);
INSERT INTO Orders VALUES(84,3,'1996-07-08',1);
INSERT INTO Orders VALUES(76,4,'1996-07-09',2);
INSERT INTO Orders VALUES(34,3,'1996-07-10',2);
INSERT INTO Orders VALUES(14,5,'1996-07-11',2);
INSERT INTO Orders VALUES(68,9,'1996-07-12',3);
INSERT INTO Orders VALUES(88,3,'1996-07-15',2);
INSERT INTO Orders VALUES(35,4,'1996-07-16',3);
INSERT INTO Orders VALUES(20,1,'1996-07-17',1);
INSERT INTO Orders VALUES(13,4,'1996-07-18',3);
INSERT INTO Orders VALUES(55,4,'1996-07-19',1);
INSERT INTO Orders VALUES(61,4,'1996-07-19',2);
INSERT INTO Orders VALUES(65,8,'1996-07-22',3);
INSERT INTO Orders VALUES(20,9,'1996-07-23',3);
INSERT INTO Orders VALUES(24,6,'1996-07-24',3);
INSERT INTO Orders VALUES(7,2,'1996-07-25',1);
INSERT INTO Orders VALUES(87,3,'1996-07-26',3);
INSERT INTO Orders VALUES(25,4,'1996-07-29',1);
INSERT INTO Orders VALUES(33,8,'1996-07-30',3);
INSERT INTO Orders VALUES(89,5,'1996-07-31',1);
INSERT INTO Orders VALUES(87,1,'1996-08-01',1);
INSERT INTO Orders VALUES(75,6,'1996-08-01',2);
INSERT INTO Orders VALUES(65,6,'1996-08-02',2);
INSERT INTO Orders VALUES(63,3,'1996-08-05',3);
INSERT INTO Orders VALUES(85,6,'1996-08-06',1);
INSERT INTO Orders VALUES(49,1,'1996-08-07',1);
INSERT INTO Orders VALUES(80,8,'1996-08-08',3);
INSERT INTO Orders VALUES(52,2,'1996-08-09',3);
INSERT INTO Orders VALUES(5,8,'1996-08-12',2);
INSERT INTO Orders VALUES(44,8,'1996-08-13',2);
INSERT INTO Orders VALUES(5,2,'1996-08-14',1);
INSERT INTO Orders VALUES(69,4,'1996-08-14',1);
INSERT INTO Orders VALUES(69,4,'1996-08-15',1);
INSERT INTO Orders VALUES(46,3,'1996-08-16',3);
INSERT INTO Orders VALUES(44,4,'1996-08-19',1);
INSERT INTO Orders VALUES(63,1,'1996-08-20',2);
INSERT INTO Orders VALUES(63,8,'1996-08-21',3);
INSERT INTO Orders VALUES(67,8,'1996-08-22',3);
INSERT INTO Orders VALUES(66,4,'1996-08-23',1);
INSERT INTO Orders VALUES(11,7,'1996-08-26',3);
INSERT INTO Orders VALUES(15,8,'1996-08-27',1);
INSERT INTO Orders VALUES(61,6,'1996-08-27',2);
INSERT INTO Orders VALUES(81,1,'1996-08-28',2);
INSERT INTO Orders VALUES(80,1,'1996-08-29',3);
INSERT INTO Orders VALUES(65,4,'1996-08-30',2);
INSERT INTO Orders VALUES(85,2,'1996-09-02',2);
INSERT INTO Orders VALUES(46,6,'1996-09-03',1);
INSERT INTO Orders VALUES(7,5,'1996-09-04',2);
INSERT INTO Orders VALUES(37,6,'1996-09-05',2);
INSERT INTO Orders VALUES(67,4,'1996-09-06',2);
INSERT INTO Orders VALUES(49,2,'1996-09-09',2);
INSERT INTO Orders VALUES(86,8,'1996-09-09',2);
INSERT INTO Orders VALUES(76,4,'1996-09-10',2);
INSERT INTO Orders VALUES(30,7,'1996-09-11',2);
INSERT INTO Orders VALUES(80,1,'1996-09-12',2);
INSERT INTO Orders VALUES(55,8,'1996-09-13',3);
INSERT INTO Orders VALUES(69,1,'1996-09-16',3);
INSERT INTO Orders VALUES(48,2,'1996-09-17',2);
INSERT INTO Orders VALUES(2,7,'1996-09-18',3);
INSERT INTO Orders VALUES(37,3,'1996-09-19',1);
INSERT INTO Orders VALUES(77,8,'1996-09-20',2);
INSERT INTO Orders VALUES(18,1,'1996-09-20',3);
INSERT INTO Orders VALUES(86,2,'1996-09-23',2);
INSERT INTO Orders VALUES(63,2,'1996-09-24',2);
INSERT INTO Orders VALUES(65,1,'1996-09-25',2);
INSERT INTO Orders VALUES(38,4,'1996-09-26',2);
INSERT INTO Orders VALUES(65,1,'1996-09-27',3);
INSERT INTO Orders VALUES(48,6,'1996-09-30',1);
INSERT INTO Orders VALUES(38,8,'1996-10-01',2);
INSERT INTO Orders VALUES(80,7,'1996-10-02',3);
INSERT INTO Orders VALUES(87,5,'1996-10-03',3);
INSERT INTO Orders VALUES(38,3,'1996-10-03',2);
INSERT INTO Orders VALUES(58,7,'1996-10-04',3);
INSERT INTO Orders VALUES(39,4,'1996-10-07',1);
INSERT INTO Orders VALUES(71,9,'1996-10-08',1);
INSERT INTO Orders VALUES(39,1,'1996-10-09',3);
INSERT INTO Orders VALUES(8,4,'1996-10-10',2);
INSERT INTO Orders VALUES(24,2,'1996-10-11',1);
INSERT INTO Orders VALUES(28,4,'1996-10-14',3);
INSERT INTO Orders VALUES(75,4,'1996-10-15',2);
INSERT INTO Orders VALUES(46,3,'1996-10-16',1);
INSERT INTO Orders VALUES(9,9,'1996-10-16',1);
INSERT INTO Orders VALUES(51,3,'1996-10-17',2);
INSERT INTO Orders VALUES(87,5,'1996-10-18',3);
INSERT INTO Orders VALUES(84,8,'1996-10-21',2);
INSERT INTO Orders VALUES(37,7,'1996-10-22',2);
INSERT INTO Orders VALUES(60,7,'1996-10-23',2);
INSERT INTO Orders VALUES(25,4,'1996-10-24',3);
INSERT INTO Orders VALUES(55,4,'1996-10-25',3);
INSERT INTO Orders VALUES(51,2,'1996-10-28',2);
INSERT INTO Orders VALUES(9,1,'1996-10-29',3);
INSERT INTO Orders VALUES(73,7,'1996-10-29',3);
INSERT INTO Orders VALUES(25,4,'1996-10-30',2);
INSERT INTO Orders VALUES(44,4,'1996-10-31',1);
INSERT INTO Orders VALUES(89,4,'1996-11-01',2);
INSERT INTO Orders VALUES(63,2,'1996-11-04',2);
INSERT INTO Orders VALUES(65,3,'1996-11-05',3);
INSERT INTO Orders VALUES(21,4,'1996-11-06',3);
INSERT INTO Orders VALUES(86,4,'1996-11-07',2);
INSERT INTO Orders VALUES(75,7,'1996-11-08',1);
INSERT INTO Orders VALUES(41,6,'1996-11-11',2);
INSERT INTO Orders VALUES(20,1,'1996-11-11',1);
INSERT INTO Orders VALUES(28,3,'1996-11-12',3);
INSERT INTO Orders VALUES(59,7,'1996-11-13',3);
INSERT INTO Orders VALUES(58,8,'1996-11-14',3);
INSERT INTO Orders VALUES(4,6,'1996-11-15',1);
INSERT INTO Orders VALUES(86,6,'1996-11-18',2);
INSERT INTO Orders VALUES(46,1,'1996-11-19',3);
INSERT INTO Orders VALUES(41,5,'1996-11-20',1);
INSERT INTO Orders VALUES(72,5,'1996-11-21',3);
INSERT INTO Orders VALUES(7,4,'1996-11-22',3);
INSERT INTO Orders VALUES(63,1,'1996-11-22',2);
INSERT INTO Orders VALUES(9,3,'1996-11-25',1);
INSERT INTO Orders VALUES(17,4,'1996-11-26',3);
INSERT INTO Orders VALUES(19,1,'1996-11-26',1);
INSERT INTO Orders VALUES(3,3,'1996-11-27',2);
INSERT INTO Orders VALUES(29,8,'1996-11-28',2);
INSERT INTO Orders VALUES(83,7,'1996-11-28',3);
INSERT INTO Orders VALUES(20,2,'1996-11-29',2);
INSERT INTO Orders VALUES(75,8,'1996-12-02',2);
INSERT INTO Orders VALUES(14,6,'1996-12-03',2);
INSERT INTO Orders VALUES(41,1,'1996-12-03',1);
INSERT INTO Orders VALUES(62,5,'1996-12-04',2);
INSERT INTO Orders VALUES(37,4,'1996-12-05',3);
INSERT INTO Orders VALUES(91,1,'1996-12-05',3);
INSERT INTO Orders VALUES(36,3,'1996-12-06',2);
INSERT INTO Orders VALUES(51,1,'1996-12-09',2);
INSERT INTO Orders VALUES(72,1,'1996-12-09',3);
INSERT INTO Orders VALUES(24,5,'1996-12-10',3);
INSERT INTO Orders VALUES(61,2,'1996-12-11',1);
INSERT INTO Orders VALUES(37,8,'1996-12-12',3);
INSERT INTO Orders VALUES(46,3,'1996-12-12',3);
INSERT INTO Orders VALUES(20,4,'1996-12-13',1);
INSERT INTO Orders VALUES(4,8,'1996-12-16',3);
INSERT INTO Orders VALUES(5,3,'1996-12-16',3);
INSERT INTO Orders VALUES(75,1,'1996-12-17',2);
INSERT INTO Orders VALUES(21,9,'1996-12-18',3);
INSERT INTO Orders VALUES(70,1,'1996-12-18',2);
INSERT INTO Orders VALUES(72,2,'1996-12-19',1);
INSERT INTO Orders VALUES(10,4,'1996-12-20',2);
INSERT INTO Orders VALUES(20,6,'1996-12-23',1);
INSERT INTO Orders VALUES(17,3,'1996-12-23',3);
INSERT INTO Orders VALUES(59,2,'1996-12-24',3);
INSERT INTO Orders VALUES(71,1,'1996-12-25',3);
INSERT INTO Orders VALUES(36,1,'1996-12-25',3);
INSERT INTO Orders VALUES(35,6,'1996-12-26',1);
INSERT INTO Orders VALUES(25,1,'1996-12-27',3);
INSERT INTO Orders VALUES(60,5,'1996-12-27',1);
INSERT INTO Orders VALUES(71,2,'1996-12-30',3);
INSERT INTO Orders VALUES(83,8,'1996-12-31',3);
INSERT INTO Orders VALUES(19,1,'1997-01-01',3);
INSERT INTO Orders VALUES(65,1,'1997-01-01',1);
INSERT INTO Orders VALUES(20,8,'1997-01-02',2);
INSERT INTO Orders VALUES(20,4,'1997-01-03',3);
INSERT INTO Orders VALUES(49,2,'1997-01-03',1);
INSERT INTO Orders VALUES(47,1,'1997-01-06',1);
INSERT INTO Orders VALUES(62,7,'1997-01-07',1);
INSERT INTO Orders VALUES(56,2,'1997-01-07',2);
INSERT INTO Orders VALUES(23,8,'1997-01-08',1);
INSERT INTO Orders VALUES(54,3,'1997-01-09',1);
INSERT INTO Orders VALUES(10,3,'1997-01-10',3);
INSERT INTO Orders VALUES(10,9,'1997-01-10',3);
INSERT INTO Orders VALUES(87,8,'1997-01-13',2);
INSERT INTO Orders VALUES(41,3,'1997-01-14',2);
INSERT INTO Orders VALUES(21,2,'1997-01-14',3);
INSERT INTO Orders VALUES(36,3,'1997-01-15',1);
INSERT INTO Orders VALUES(87,8,'1997-01-16',3);
INSERT INTO Orders VALUES(73,4,'1997-01-16',3);
INSERT INTO Orders VALUES(63,4,'1997-01-17',1);
INSERT INTO Orders VALUES(68,4,'1997-01-20',2);
INSERT INTO Orders VALUES(88,3,'1997-01-21',1);
INSERT INTO Orders VALUES(61,8,'1997-01-21',1);
INSERT INTO Orders VALUES(27,2,'1997-01-22',1);
INSERT INTO Orders VALUES(31,6,'1997-01-23',3);
INSERT INTO Orders VALUES(51,7,'1997-01-23',2);
INSERT INTO Orders VALUES(41,6,'1997-01-24',2);
INSERT INTO Orders VALUES(29,4,'1997-01-27',1);
INSERT INTO Orders VALUES(59,4,'1997-01-27',2);
INSERT INTO Orders VALUES(66,7,'1997-01-28',1);
INSERT INTO Orders VALUES(37,3,'1997-01-29',2);
INSERT INTO Orders VALUES(20,4,'1997-01-30',1);
INSERT INTO Orders VALUES(10,4,'1997-01-30',2);
INSERT INTO Orders VALUES(75,3,'1997-01-31',2);
INSERT INTO Orders VALUES(60,3,'1997-02-03',3);
INSERT INTO Orders VALUES(24,3,'1997-02-03',2);
INSERT INTO Orders VALUES(16,8,'1997-02-04',2);
INSERT INTO Orders VALUES(7,3,'1997-02-05',2);
INSERT INTO Orders VALUES(87,8,'1997-02-05',1);
INSERT INTO Orders VALUES(79,3,'1997-02-06',2);
INSERT INTO Orders VALUES(51,6,'1997-02-07',3);
INSERT INTO Orders VALUES(71,4,'1997-02-10',2);
INSERT INTO Orders VALUES(55,3,'1997-02-10',2);
INSERT INTO Orders VALUES(20,3,'1997-02-11',2);
INSERT INTO Orders VALUES(66,8,'1997-02-12',1);
GO

INSERT INTO OrderDetails VALUES(10248,11,12);
INSERT INTO OrderDetails VALUES(10248,42,10);
INSERT INTO OrderDetails VALUES(10248,72,5);
INSERT INTO OrderDetails VALUES(10249,14,9);
INSERT INTO OrderDetails VALUES(10249,51,40);
INSERT INTO OrderDetails VALUES(10250,41,10);
INSERT INTO OrderDetails VALUES(10250,51,35);
INSERT INTO OrderDetails VALUES(10250,65,15);
INSERT INTO OrderDetails VALUES(10251,22,6);
INSERT INTO OrderDetails VALUES(10251,57,15);
INSERT INTO OrderDetails VALUES(10251,65,20);
INSERT INTO OrderDetails VALUES(10252,20,40);
INSERT INTO OrderDetails VALUES(10252,33,25);
INSERT INTO OrderDetails VALUES(10252,60,40);
INSERT INTO OrderDetails VALUES(10253,31,20);
INSERT INTO OrderDetails VALUES(10253,39,42);
INSERT INTO OrderDetails VALUES(10253,49,40);
INSERT INTO OrderDetails VALUES(10254,24,15);
INSERT INTO OrderDetails VALUES(10254,55,21);
INSERT INTO OrderDetails VALUES(10254,74,21);
INSERT INTO OrderDetails VALUES(10255,2,20);
INSERT INTO OrderDetails VALUES(10255,16,35);
INSERT INTO OrderDetails VALUES(10255,36,25);
INSERT INTO OrderDetails VALUES(10255,59,30);
INSERT INTO OrderDetails VALUES(10256,53,15);
INSERT INTO OrderDetails VALUES(10256,77,12);
INSERT INTO OrderDetails VALUES(10257,27,25);
INSERT INTO OrderDetails VALUES(10257,39,6);
INSERT INTO OrderDetails VALUES(10257,77,15);
INSERT INTO OrderDetails VALUES(10258,2,50);
INSERT INTO OrderDetails VALUES(10258,5,65);
INSERT INTO OrderDetails VALUES(10258,32,6);
INSERT INTO OrderDetails VALUES(10259,21,10);
INSERT INTO OrderDetails VALUES(10259,37,1);
INSERT INTO OrderDetails VALUES(10260,41,16);
INSERT INTO OrderDetails VALUES(10260,57,50);
INSERT INTO OrderDetails VALUES(10260,62,15);
INSERT INTO OrderDetails VALUES(10260,70,21);
INSERT INTO OrderDetails VALUES(10261,21,20);
INSERT INTO OrderDetails VALUES(10261,35,20);
INSERT INTO OrderDetails VALUES(10262,5,12);
INSERT INTO OrderDetails VALUES(10262,7,15);
INSERT INTO OrderDetails VALUES(10262,56,2);
INSERT INTO OrderDetails VALUES(10263,16,60);
INSERT INTO OrderDetails VALUES(10263,24,28);
INSERT INTO OrderDetails VALUES(10263,30,60);
INSERT INTO OrderDetails VALUES(10263,74,36);
INSERT INTO OrderDetails VALUES(10264,2,35);
INSERT INTO OrderDetails VALUES(10264,41,25);
INSERT INTO OrderDetails VALUES(10265,17,30);
INSERT INTO OrderDetails VALUES(10265,70,20);
INSERT INTO OrderDetails VALUES(10266,12,12);
INSERT INTO OrderDetails VALUES(10267,40,50);
INSERT INTO OrderDetails VALUES(10267,59,70);
INSERT INTO OrderDetails VALUES(10267,76,15);
INSERT INTO OrderDetails VALUES(10268,29,10);
INSERT INTO OrderDetails VALUES(10268,72,4);
INSERT INTO OrderDetails VALUES(10269,33,60);
INSERT INTO OrderDetails VALUES(10269,72,20);
INSERT INTO OrderDetails VALUES(10270,36,30);
INSERT INTO OrderDetails VALUES(10270,43,25);
INSERT INTO OrderDetails VALUES(10271,33,24);
INSERT INTO OrderDetails VALUES(10272,20,6);
INSERT INTO OrderDetails VALUES(10272,31,40);
INSERT INTO OrderDetails VALUES(10272,72,24);
INSERT INTO OrderDetails VALUES(10273,10,24);
INSERT INTO OrderDetails VALUES(10273,31,15);
INSERT INTO OrderDetails VALUES(10273,33,20);
INSERT INTO OrderDetails VALUES(10273,40,60);
INSERT INTO OrderDetails VALUES(10273,76,33);
INSERT INTO OrderDetails VALUES(10274,71,20);
INSERT INTO OrderDetails VALUES(10274,72,7);
INSERT INTO OrderDetails VALUES(10275,24,12);
INSERT INTO OrderDetails VALUES(10275,59,6);
INSERT INTO OrderDetails VALUES(10276,10,15);
INSERT INTO OrderDetails VALUES(10276,13,10);
INSERT INTO OrderDetails VALUES(10277,28,20);
INSERT INTO OrderDetails VALUES(10277,62,12);
INSERT INTO OrderDetails VALUES(10278,44,16);
INSERT INTO OrderDetails VALUES(10278,59,15);
INSERT INTO OrderDetails VALUES(10278,63,8);
INSERT INTO OrderDetails VALUES(10278,73,25);
INSERT INTO OrderDetails VALUES(10279,17,15);
INSERT INTO OrderDetails VALUES(10280,24,12);
INSERT INTO OrderDetails VALUES(10280,55,20);
INSERT INTO OrderDetails VALUES(10280,75,30);
INSERT INTO OrderDetails VALUES(10281,19,1);
INSERT INTO OrderDetails VALUES(10281,24,6);
INSERT INTO OrderDetails VALUES(10281,35,4);
INSERT INTO OrderDetails VALUES(10282,30,6);
INSERT INTO OrderDetails VALUES(10282,57,2);
INSERT INTO OrderDetails VALUES(10283,15,20);
INSERT INTO OrderDetails VALUES(10283,19,18);
INSERT INTO OrderDetails VALUES(10283,60,35);
INSERT INTO OrderDetails VALUES(10283,72,3);
INSERT INTO OrderDetails VALUES(10284,27,15);
INSERT INTO OrderDetails VALUES(10284,44,21);
INSERT INTO OrderDetails VALUES(10284,60,20);
INSERT INTO OrderDetails VALUES(10284,67,5);
INSERT INTO OrderDetails VALUES(10285,1,45);
INSERT INTO OrderDetails VALUES(10285,40,40);
INSERT INTO OrderDetails VALUES(10285,53,36);
INSERT INTO OrderDetails VALUES(10286,35,100);
INSERT INTO OrderDetails VALUES(10286,62,40);
INSERT INTO OrderDetails VALUES(10287,16,40);
INSERT INTO OrderDetails VALUES(10287,34,20);
INSERT INTO OrderDetails VALUES(10287,46,15);
INSERT INTO OrderDetails VALUES(10288,54,10);
INSERT INTO OrderDetails VALUES(10288,68,3);
INSERT INTO OrderDetails VALUES(10289,3,30);
INSERT INTO OrderDetails VALUES(10289,64,9);
INSERT INTO OrderDetails VALUES(10290,5,20);
INSERT INTO OrderDetails VALUES(10290,29,15);
INSERT INTO OrderDetails VALUES(10290,49,15);
INSERT INTO OrderDetails VALUES(10290,77,10);
INSERT INTO OrderDetails VALUES(10291,13,20);
INSERT INTO OrderDetails VALUES(10291,44,24);
INSERT INTO OrderDetails VALUES(10291,51,2);
INSERT INTO OrderDetails VALUES(10292,20,20);
INSERT INTO OrderDetails VALUES(10293,18,12);
INSERT INTO OrderDetails VALUES(10293,24,10);
INSERT INTO OrderDetails VALUES(10293,63,5);
INSERT INTO OrderDetails VALUES(10293,75,6);
INSERT INTO OrderDetails VALUES(10294,1,18);
INSERT INTO OrderDetails VALUES(10294,17,15);
INSERT INTO OrderDetails VALUES(10294,43,15);
INSERT INTO OrderDetails VALUES(10294,60,21);
INSERT INTO OrderDetails VALUES(10294,75,6);
INSERT INTO OrderDetails VALUES(10295,56,4);
INSERT INTO OrderDetails VALUES(10296,11,12);
INSERT INTO OrderDetails VALUES(10296,16,30);
INSERT INTO OrderDetails VALUES(10296,69,15);
INSERT INTO OrderDetails VALUES(10297,39,60);
INSERT INTO OrderDetails VALUES(10297,72,20);
INSERT INTO OrderDetails VALUES(10298,2,40);
INSERT INTO OrderDetails VALUES(10298,36,40);
INSERT INTO OrderDetails VALUES(10298,59,30);
INSERT INTO OrderDetails VALUES(10298,62,15);
INSERT INTO OrderDetails VALUES(10299,19,15);
INSERT INTO OrderDetails VALUES(10299,70,20);
INSERT INTO OrderDetails VALUES(10300,66,30);
INSERT INTO OrderDetails VALUES(10300,68,20);
INSERT INTO OrderDetails VALUES(10301,40,10);
INSERT INTO OrderDetails VALUES(10301,56,20);
INSERT INTO OrderDetails VALUES(10302,17,40);
INSERT INTO OrderDetails VALUES(10302,28,28);
INSERT INTO OrderDetails VALUES(10302,43,12);
INSERT INTO OrderDetails VALUES(10303,40,40);
INSERT INTO OrderDetails VALUES(10303,65,30);
INSERT INTO OrderDetails VALUES(10303,68,15);
INSERT INTO OrderDetails VALUES(10304,49,30);
INSERT INTO OrderDetails VALUES(10304,59,10);
INSERT INTO OrderDetails VALUES(10304,71,2);
INSERT INTO OrderDetails VALUES(10305,18,25);
INSERT INTO OrderDetails VALUES(10305,29,25);
INSERT INTO OrderDetails VALUES(10305,39,30);
INSERT INTO OrderDetails VALUES(10306,30,10);
INSERT INTO OrderDetails VALUES(10306,53,10);
INSERT INTO OrderDetails VALUES(10306,54,5);
INSERT INTO OrderDetails VALUES(10307,62,10);
INSERT INTO OrderDetails VALUES(10307,68,3);
INSERT INTO OrderDetails VALUES(10308,69,1);
INSERT INTO OrderDetails VALUES(10308,70,5);
INSERT INTO OrderDetails VALUES(10309,4,20);
INSERT INTO OrderDetails VALUES(10309,6,30);
INSERT INTO OrderDetails VALUES(10309,42,2);
INSERT INTO OrderDetails VALUES(10309,43,20);
INSERT INTO OrderDetails VALUES(10309,71,3);
INSERT INTO OrderDetails VALUES(10310,16,10);
INSERT INTO OrderDetails VALUES(10310,62,5);
INSERT INTO OrderDetails VALUES(10311,42,6);
INSERT INTO OrderDetails VALUES(10311,69,7);
INSERT INTO OrderDetails VALUES(10312,28,4);
INSERT INTO OrderDetails VALUES(10312,43,24);
INSERT INTO OrderDetails VALUES(10312,53,20);
INSERT INTO OrderDetails VALUES(10312,75,10);
INSERT INTO OrderDetails VALUES(10313,36,12);
INSERT INTO OrderDetails VALUES(10314,32,40);
INSERT INTO OrderDetails VALUES(10314,58,30);
INSERT INTO OrderDetails VALUES(10314,62,25);
INSERT INTO OrderDetails VALUES(10315,34,14);
INSERT INTO OrderDetails VALUES(10315,70,30);
INSERT INTO OrderDetails VALUES(10316,41,10);
INSERT INTO OrderDetails VALUES(10316,62,70);
INSERT INTO OrderDetails VALUES(10317,1,20);
INSERT INTO OrderDetails VALUES(10318,41,20);
INSERT INTO OrderDetails VALUES(10318,76,6);
INSERT INTO OrderDetails VALUES(10319,17,8);
INSERT INTO OrderDetails VALUES(10319,28,14);
INSERT INTO OrderDetails VALUES(10319,76,30);
INSERT INTO OrderDetails VALUES(10320,71,30);
INSERT INTO OrderDetails VALUES(10321,35,10);
INSERT INTO OrderDetails VALUES(10322,52,20);
INSERT INTO OrderDetails VALUES(10323,15,5);
INSERT INTO OrderDetails VALUES(10323,25,4);
INSERT INTO OrderDetails VALUES(10323,39,4);
INSERT INTO OrderDetails VALUES(10324,16,21);
INSERT INTO OrderDetails VALUES(10324,35,70);
INSERT INTO OrderDetails VALUES(10324,46,30);
INSERT INTO OrderDetails VALUES(10324,59,40);
INSERT INTO OrderDetails VALUES(10324,63,80);
INSERT INTO OrderDetails VALUES(10325,6,6);
INSERT INTO OrderDetails VALUES(10325,13,12);
INSERT INTO OrderDetails VALUES(10325,14,9);
INSERT INTO OrderDetails VALUES(10325,31,4);
INSERT INTO OrderDetails VALUES(10325,72,40);
INSERT INTO OrderDetails VALUES(10326,4,24);
INSERT INTO OrderDetails VALUES(10326,57,16);
INSERT INTO OrderDetails VALUES(10326,75,50);
INSERT INTO OrderDetails VALUES(10327,2,25);
INSERT INTO OrderDetails VALUES(10327,11,50);
INSERT INTO OrderDetails VALUES(10327,30,35);
INSERT INTO OrderDetails VALUES(10327,58,30);
INSERT INTO OrderDetails VALUES(10328,59,9);
INSERT INTO OrderDetails VALUES(10328,65,40);
INSERT INTO OrderDetails VALUES(10328,68,10);
INSERT INTO OrderDetails VALUES(10329,19,10);
INSERT INTO OrderDetails VALUES(10329,30,8);
INSERT INTO OrderDetails VALUES(10329,38,20);
INSERT INTO OrderDetails VALUES(10329,56,12);
INSERT INTO OrderDetails VALUES(10330,26,50);
INSERT INTO OrderDetails VALUES(10330,72,25);
INSERT INTO OrderDetails VALUES(10331,54,15);
INSERT INTO OrderDetails VALUES(10332,18,40);
INSERT INTO OrderDetails VALUES(10332,42,10);
INSERT INTO OrderDetails VALUES(10332,47,16);
INSERT INTO OrderDetails VALUES(10333,14,10);
INSERT INTO OrderDetails VALUES(10333,21,10);
INSERT INTO OrderDetails VALUES(10333,71,40);
INSERT INTO OrderDetails VALUES(10334,52,8);
INSERT INTO OrderDetails VALUES(10334,68,10);
INSERT INTO OrderDetails VALUES(10335,2,7);
INSERT INTO OrderDetails VALUES(10335,31,25);
INSERT INTO OrderDetails VALUES(10335,32,6);
INSERT INTO OrderDetails VALUES(10335,51,48);
INSERT INTO OrderDetails VALUES(10336,4,18);
INSERT INTO OrderDetails VALUES(10337,23,40);
INSERT INTO OrderDetails VALUES(10337,26,24);
INSERT INTO OrderDetails VALUES(10337,36,20);
INSERT INTO OrderDetails VALUES(10337,37,28);
INSERT INTO OrderDetails VALUES(10337,72,25);
INSERT INTO OrderDetails VALUES(10338,17,20);
INSERT INTO OrderDetails VALUES(10338,30,15);
INSERT INTO OrderDetails VALUES(10339,4,10);
INSERT INTO OrderDetails VALUES(10339,17,70);
INSERT INTO OrderDetails VALUES(10339,62,28);
INSERT INTO OrderDetails VALUES(10340,18,20);
INSERT INTO OrderDetails VALUES(10340,41,12);
INSERT INTO OrderDetails VALUES(10340,43,40);
INSERT INTO OrderDetails VALUES(10341,33,8);
INSERT INTO OrderDetails VALUES(10341,59,9);
INSERT INTO OrderDetails VALUES(10342,2,24);
INSERT INTO OrderDetails VALUES(10342,31,56);
INSERT INTO OrderDetails VALUES(10342,36,40);
INSERT INTO OrderDetails VALUES(10342,55,40);
INSERT INTO OrderDetails VALUES(10343,64,50);
INSERT INTO OrderDetails VALUES(10343,68,4);
INSERT INTO OrderDetails VALUES(10343,76,15);
INSERT INTO OrderDetails VALUES(10344,4,35);
INSERT INTO OrderDetails VALUES(10344,8,70);
INSERT INTO OrderDetails VALUES(10345,8,70);
INSERT INTO OrderDetails VALUES(10345,19,80);
INSERT INTO OrderDetails VALUES(10345,42,9);
INSERT INTO OrderDetails VALUES(10346,17,36);
INSERT INTO OrderDetails VALUES(10346,56,20);
INSERT INTO OrderDetails VALUES(10347,25,10);
INSERT INTO OrderDetails VALUES(10347,39,50);
INSERT INTO OrderDetails VALUES(10347,40,4);
INSERT INTO OrderDetails VALUES(10347,75,6);
INSERT INTO OrderDetails VALUES(10348,1,15);
INSERT INTO OrderDetails VALUES(10348,23,25);
INSERT INTO OrderDetails VALUES(10349,54,24);
INSERT INTO OrderDetails VALUES(10350,50,15);
INSERT INTO OrderDetails VALUES(10350,69,18);
INSERT INTO OrderDetails VALUES(10351,38,20);
INSERT INTO OrderDetails VALUES(10351,41,13);
INSERT INTO OrderDetails VALUES(10351,44,77);
INSERT INTO OrderDetails VALUES(10351,65,10);
INSERT INTO OrderDetails VALUES(10352,24,10);
INSERT INTO OrderDetails VALUES(10352,54,20);
INSERT INTO OrderDetails VALUES(10353,11,12);
INSERT INTO OrderDetails VALUES(10353,38,50);
INSERT INTO OrderDetails VALUES(10354,1,12);
INSERT INTO OrderDetails VALUES(10354,29,4);
INSERT INTO OrderDetails VALUES(10355,24,25);
INSERT INTO OrderDetails VALUES(10355,57,25);
INSERT INTO OrderDetails VALUES(10356,31,30);
INSERT INTO OrderDetails VALUES(10356,55,12);
INSERT INTO OrderDetails VALUES(10356,69,20);
INSERT INTO OrderDetails VALUES(10357,10,30);
INSERT INTO OrderDetails VALUES(10357,26,16);
INSERT INTO OrderDetails VALUES(10357,60,8);
INSERT INTO OrderDetails VALUES(10358,24,10);
INSERT INTO OrderDetails VALUES(10358,34,10);
INSERT INTO OrderDetails VALUES(10358,36,20);
INSERT INTO OrderDetails VALUES(10359,16,56);
INSERT INTO OrderDetails VALUES(10359,31,70);
INSERT INTO OrderDetails VALUES(10359,60,80);
INSERT INTO OrderDetails VALUES(10360,28,30);
INSERT INTO OrderDetails VALUES(10360,29,35);
INSERT INTO OrderDetails VALUES(10360,38,10);
INSERT INTO OrderDetails VALUES(10360,49,35);
INSERT INTO OrderDetails VALUES(10360,54,28);
INSERT INTO OrderDetails VALUES(10361,39,54);
INSERT INTO OrderDetails VALUES(10361,60,55);
INSERT INTO OrderDetails VALUES(10362,25,50);
INSERT INTO OrderDetails VALUES(10362,51,20);
INSERT INTO OrderDetails VALUES(10362,54,24);
INSERT INTO OrderDetails VALUES(10363,31,20);
INSERT INTO OrderDetails VALUES(10363,75,12);
INSERT INTO OrderDetails VALUES(10363,76,12);
INSERT INTO OrderDetails VALUES(10364,69,30);
INSERT INTO OrderDetails VALUES(10364,71,5);
INSERT INTO OrderDetails VALUES(10365,11,24);
INSERT INTO OrderDetails VALUES(10366,65,5);
INSERT INTO OrderDetails VALUES(10366,77,5);
INSERT INTO OrderDetails VALUES(10367,34,36);
INSERT INTO OrderDetails VALUES(10367,54,18);
INSERT INTO OrderDetails VALUES(10367,65,15);
INSERT INTO OrderDetails VALUES(10367,77,7);
INSERT INTO OrderDetails VALUES(10368,21,5);
INSERT INTO OrderDetails VALUES(10368,28,13);
INSERT INTO OrderDetails VALUES(10368,57,25);
INSERT INTO OrderDetails VALUES(10368,64,35);
INSERT INTO OrderDetails VALUES(10369,29,20);
INSERT INTO OrderDetails VALUES(10369,56,18);
INSERT INTO OrderDetails VALUES(10370,1,15);
INSERT INTO OrderDetails VALUES(10370,64,30);
INSERT INTO OrderDetails VALUES(10370,74,20);
INSERT INTO OrderDetails VALUES(10371,36,6);
INSERT INTO OrderDetails VALUES(10372,20,12);
INSERT INTO OrderDetails VALUES(10372,38,40);
INSERT INTO OrderDetails VALUES(10372,60,70);
INSERT INTO OrderDetails VALUES(10372,72,42);
INSERT INTO OrderDetails VALUES(10373,58,80);
INSERT INTO OrderDetails VALUES(10373,71,50);
INSERT INTO OrderDetails VALUES(10374,31,30);
INSERT INTO OrderDetails VALUES(10374,58,15);
INSERT INTO OrderDetails VALUES(10375,14,15);
INSERT INTO OrderDetails VALUES(10375,54,10);
INSERT INTO OrderDetails VALUES(10376,31,42);
INSERT INTO OrderDetails VALUES(10377,28,20);
INSERT INTO OrderDetails VALUES(10377,39,20);
INSERT INTO OrderDetails VALUES(10378,71,6);
INSERT INTO OrderDetails VALUES(10379,41,8);
INSERT INTO OrderDetails VALUES(10379,63,16);
INSERT INTO OrderDetails VALUES(10379,65,20);
INSERT INTO OrderDetails VALUES(10380,30,18);
INSERT INTO OrderDetails VALUES(10380,53,20);
INSERT INTO OrderDetails VALUES(10380,60,6);
INSERT INTO OrderDetails VALUES(10380,70,30);
INSERT INTO OrderDetails VALUES(10381,74,14);
INSERT INTO OrderDetails VALUES(10382,5,32);
INSERT INTO OrderDetails VALUES(10382,18,9);
INSERT INTO OrderDetails VALUES(10382,29,14);
INSERT INTO OrderDetails VALUES(10382,33,60);
INSERT INTO OrderDetails VALUES(10382,74,50);
INSERT INTO OrderDetails VALUES(10383,13,20);
INSERT INTO OrderDetails VALUES(10383,50,15);
INSERT INTO OrderDetails VALUES(10383,56,20);
INSERT INTO OrderDetails VALUES(10384,20,28);
INSERT INTO OrderDetails VALUES(10384,60,15);
INSERT INTO OrderDetails VALUES(10385,7,10);
INSERT INTO OrderDetails VALUES(10385,60,20);
INSERT INTO OrderDetails VALUES(10385,68,8);
INSERT INTO OrderDetails VALUES(10386,24,15);
INSERT INTO OrderDetails VALUES(10386,34,10);
INSERT INTO OrderDetails VALUES(10387,24,15);
INSERT INTO OrderDetails VALUES(10387,28,6);
INSERT INTO OrderDetails VALUES(10387,59,12);
INSERT INTO OrderDetails VALUES(10387,71,15);
INSERT INTO OrderDetails VALUES(10388,45,15);
INSERT INTO OrderDetails VALUES(10388,52,20);
INSERT INTO OrderDetails VALUES(10388,53,40);
INSERT INTO OrderDetails VALUES(10389,10,16);
INSERT INTO OrderDetails VALUES(10389,55,15);
INSERT INTO OrderDetails VALUES(10389,62,20);
INSERT INTO OrderDetails VALUES(10389,70,30);
INSERT INTO OrderDetails VALUES(10390,31,60);
INSERT INTO OrderDetails VALUES(10390,35,40);
INSERT INTO OrderDetails VALUES(10390,46,45);
INSERT INTO OrderDetails VALUES(10390,72,24);
INSERT INTO OrderDetails VALUES(10391,13,18);
INSERT INTO OrderDetails VALUES(10392,69,50);
INSERT INTO OrderDetails VALUES(10393,2,25);
INSERT INTO OrderDetails VALUES(10393,14,42);
INSERT INTO OrderDetails VALUES(10393,25,7);
INSERT INTO OrderDetails VALUES(10393,26,70);
INSERT INTO OrderDetails VALUES(10393,31,32);
INSERT INTO OrderDetails VALUES(10394,13,10);
INSERT INTO OrderDetails VALUES(10394,62,10);
INSERT INTO OrderDetails VALUES(10395,46,28);
INSERT INTO OrderDetails VALUES(10395,53,70);
INSERT INTO OrderDetails VALUES(10395,69,8);
INSERT INTO OrderDetails VALUES(10396,23,40);
INSERT INTO OrderDetails VALUES(10396,71,60);
INSERT INTO OrderDetails VALUES(10396,72,21);
INSERT INTO OrderDetails VALUES(10397,21,10);
INSERT INTO OrderDetails VALUES(10397,51,18);
INSERT INTO OrderDetails VALUES(10398,35,30);
INSERT INTO OrderDetails VALUES(10398,55,120);
INSERT INTO OrderDetails VALUES(10399,68,60);
INSERT INTO OrderDetails VALUES(10399,71,30);
INSERT INTO OrderDetails VALUES(10399,76,35);
INSERT INTO OrderDetails VALUES(10399,77,14);
INSERT INTO OrderDetails VALUES(10400,29,21);
INSERT INTO OrderDetails VALUES(10400,35,35);
INSERT INTO OrderDetails VALUES(10400,49,30);
INSERT INTO OrderDetails VALUES(10401,30,18);
INSERT INTO OrderDetails VALUES(10401,56,70);
INSERT INTO OrderDetails VALUES(10401,65,20);
INSERT INTO OrderDetails VALUES(10401,71,60);
INSERT INTO OrderDetails VALUES(10402,23,60);
INSERT INTO OrderDetails VALUES(10402,63,65);
INSERT INTO OrderDetails VALUES(10403,16,21);
INSERT INTO OrderDetails VALUES(10403,48,70);
INSERT INTO OrderDetails VALUES(10404,26,30);
INSERT INTO OrderDetails VALUES(10404,42,40);
INSERT INTO OrderDetails VALUES(10404,49,30);
INSERT INTO OrderDetails VALUES(10405,3,50);
INSERT INTO OrderDetails VALUES(10406,1,10);
INSERT INTO OrderDetails VALUES(10406,21,30);
INSERT INTO OrderDetails VALUES(10406,28,42);
INSERT INTO OrderDetails VALUES(10406,36,5);
INSERT INTO OrderDetails VALUES(10406,40,2);
INSERT INTO OrderDetails VALUES(10407,11,30);
INSERT INTO OrderDetails VALUES(10407,69,15);
INSERT INTO OrderDetails VALUES(10407,71,15);
INSERT INTO OrderDetails VALUES(10408,37,10);
INSERT INTO OrderDetails VALUES(10408,54,6);
INSERT INTO OrderDetails VALUES(10408,62,35);
INSERT INTO OrderDetails VALUES(10409,14,12);
INSERT INTO OrderDetails VALUES(10409,21,12);
INSERT INTO OrderDetails VALUES(10410,33,49);
INSERT INTO OrderDetails VALUES(10410,59,16);
INSERT INTO OrderDetails VALUES(10411,41,25);
INSERT INTO OrderDetails VALUES(10411,44,40);
INSERT INTO OrderDetails VALUES(10411,59,9);
INSERT INTO OrderDetails VALUES(10412,14,20);
INSERT INTO OrderDetails VALUES(10413,1,24);
INSERT INTO OrderDetails VALUES(10413,62,40);
INSERT INTO OrderDetails VALUES(10413,76,14);
INSERT INTO OrderDetails VALUES(10414,19,18);
INSERT INTO OrderDetails VALUES(10414,33,50);
INSERT INTO OrderDetails VALUES(10415,17,2);
INSERT INTO OrderDetails VALUES(10415,33,20);
INSERT INTO OrderDetails VALUES(10416,19,20);
INSERT INTO OrderDetails VALUES(10416,53,10);
INSERT INTO OrderDetails VALUES(10416,57,20);
INSERT INTO OrderDetails VALUES(10417,38,50);
INSERT INTO OrderDetails VALUES(10417,46,2);
INSERT INTO OrderDetails VALUES(10417,68,36);
INSERT INTO OrderDetails VALUES(10417,77,35);
INSERT INTO OrderDetails VALUES(10418,2,60);
INSERT INTO OrderDetails VALUES(10418,47,55);
INSERT INTO OrderDetails VALUES(10418,61,16);
INSERT INTO OrderDetails VALUES(10418,74,15);
INSERT INTO OrderDetails VALUES(10419,60,60);
INSERT INTO OrderDetails VALUES(10419,69,20);
INSERT INTO OrderDetails VALUES(10420,9,20);
INSERT INTO OrderDetails VALUES(10420,13,2);
INSERT INTO OrderDetails VALUES(10420,70,8);
INSERT INTO OrderDetails VALUES(10420,73,20);
INSERT INTO OrderDetails VALUES(10421,19,4);
INSERT INTO OrderDetails VALUES(10421,26,30);
INSERT INTO OrderDetails VALUES(10421,53,15);
INSERT INTO OrderDetails VALUES(10421,77,10);
INSERT INTO OrderDetails VALUES(10422,26,2);
INSERT INTO OrderDetails VALUES(10423,31,14);
INSERT INTO OrderDetails VALUES(10423,59,20);
INSERT INTO OrderDetails VALUES(10424,35,60);
INSERT INTO OrderDetails VALUES(10424,38,49);
INSERT INTO OrderDetails VALUES(10424,68,30);
INSERT INTO OrderDetails VALUES(10425,55,10);
INSERT INTO OrderDetails VALUES(10425,76,20);
INSERT INTO OrderDetails VALUES(10426,56,5);
INSERT INTO OrderDetails VALUES(10426,64,7);
INSERT INTO OrderDetails VALUES(10427,14,35);
INSERT INTO OrderDetails VALUES(10428,46,20);
INSERT INTO OrderDetails VALUES(10429,50,40);
INSERT INTO OrderDetails VALUES(10429,63,35);
INSERT INTO OrderDetails VALUES(10430,17,45);
INSERT INTO OrderDetails VALUES(10430,21,50);
INSERT INTO OrderDetails VALUES(10430,56,30);
INSERT INTO OrderDetails VALUES(10430,59,70);
INSERT INTO OrderDetails VALUES(10431,17,50);
INSERT INTO OrderDetails VALUES(10431,40,50);
INSERT INTO OrderDetails VALUES(10431,47,30);
INSERT INTO OrderDetails VALUES(10432,26,10);
INSERT INTO OrderDetails VALUES(10432,54,40);
INSERT INTO OrderDetails VALUES(10433,56,28);
INSERT INTO OrderDetails VALUES(10434,11,6);
INSERT INTO OrderDetails VALUES(10434,76,18);
INSERT INTO OrderDetails VALUES(10435,2,10);
INSERT INTO OrderDetails VALUES(10435,22,12);
INSERT INTO OrderDetails VALUES(10435,72,10);
INSERT INTO OrderDetails VALUES(10436,46,5);
INSERT INTO OrderDetails VALUES(10436,56,40);
INSERT INTO OrderDetails VALUES(10436,64,30);
INSERT INTO OrderDetails VALUES(10436,75,24);
INSERT INTO OrderDetails VALUES(10437,53,15);
INSERT INTO OrderDetails VALUES(10438,19,15);
INSERT INTO OrderDetails VALUES(10438,34,20);
INSERT INTO OrderDetails VALUES(10438,57,15);
INSERT INTO OrderDetails VALUES(10439,12,15);
INSERT INTO OrderDetails VALUES(10439,16,16);
INSERT INTO OrderDetails VALUES(10439,64,6);
INSERT INTO OrderDetails VALUES(10439,74,30);
INSERT INTO OrderDetails VALUES(10440,2,45);
INSERT INTO OrderDetails VALUES(10440,16,49);
INSERT INTO OrderDetails VALUES(10440,29,24);
INSERT INTO OrderDetails VALUES(10440,61,90);
INSERT INTO OrderDetails VALUES(10441,27,50);
INSERT INTO OrderDetails VALUES(10442,11,30);
INSERT INTO OrderDetails VALUES(10442,54,80);
INSERT INTO OrderDetails VALUES(10442,66,60);
INSERT INTO OrderDetails VALUES(10443,11,6);
INSERT INTO OrderDetails VALUES(10443,28,12);
GO

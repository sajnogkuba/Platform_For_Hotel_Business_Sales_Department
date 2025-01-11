-- tables
-- Table: Halls
CREATE TABLE Halls (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    price_per_hour double(10,2)  NOT NULL,
    square_meters int  NOT NULL,
    CONSTRAINT Halls_pk PRIMARY KEY (id)
);

-- Table: Reservation_Halls
CREATE TABLE Reservation_Halls (
    Reservations_id int  NOT NULL,
    Halls_id int  NOT NULL,
    price double(10,2)  NOT NULL,
    CONSTRAINT Reservation_Halls_pk PRIMARY KEY (Reservations_id,Halls_id)
);

-- Table: Reservation_Statuses
CREATE TABLE Reservation_Statuses (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    description varchar(200)  NOT NULL,
    CONSTRAINT Reservation_Statuses_pk PRIMARY KEY (id)
);

-- Table: Reservations
CREATE TABLE Reservations (
    id int  NOT NULL AUTO_INCREMENT,
    buyer_id int  NOT NULL,
    created_by int  NOT NULL,
    start_date datetime  NOT NULL,
    end_date datetime  NOT NULL,
    Reservation_Statuses_id int  NOT NULL,
    CONSTRAINT Reservations_pk PRIMARY KEY (id)
);

-- Table: Roles
CREATE TABLE Roles (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    description varchar(200)  NOT NULL,
    CONSTRAINT Roles_pk PRIMARY KEY (id)
);

-- Table: Users
CREATE TABLE Users (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(100)  NOT NULL,
    email varchar(100)  NOT NULL,
    password varchar(100)  NOT NULL,
    Role_id int  NOT NULL,
    phone varchar(50)  NOT NULL,
    CONSTRAINT Users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Reservation_Halls_Halls (table: Reservation_Halls)
ALTER TABLE Reservation_Halls ADD CONSTRAINT Reservation_Halls_Halls FOREIGN KEY Reservation_Halls_Halls (Halls_id)
    REFERENCES Halls (id);

-- Reference: Reservation_Halls_Reservations (table: Reservation_Halls)
ALTER TABLE Reservation_Halls ADD CONSTRAINT Reservation_Halls_Reservations FOREIGN KEY Reservation_Halls_Reservations (Reservations_id)
    REFERENCES Reservations (id);

-- Reference: Reservations_Reservation_Statuses (table: Reservations)
ALTER TABLE Reservations ADD CONSTRAINT Reservations_Reservation_Statuses FOREIGN KEY Reservations_Reservation_Statuses (Reservation_Statuses_id)
    REFERENCES Reservation_Statuses (id);

-- Reference: Reservations_Users (table: Reservations)
ALTER TABLE Reservations ADD CONSTRAINT Reservations_Users FOREIGN KEY Reservations_Users (created_by)
    REFERENCES Users (id);

-- Reference: Reservations_Users_1 (table: Reservations)
ALTER TABLE Reservations ADD CONSTRAINT Reservations_Users_1 FOREIGN KEY Reservations_Users_1 (buyer_id)
    REFERENCES Users (id);

-- Reference: Users_Roles (table: Users)
ALTER TABLE Users ADD CONSTRAINT Users_Roles FOREIGN KEY Users_Roles (Role_id)
    REFERENCES Roles (id);

-- End of file.


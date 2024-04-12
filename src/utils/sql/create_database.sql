CREATE TABLE passengers
(
    passenger_id SERIAL PRIMARY KEY,
    full_name    VARCHAR(100) NOT NULL DEFAULT '',
    email        VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) UNIQUE
);

CREATE TABLE drivers
(
    driver_id      SERIAL PRIMARY KEY,
    full_name      VARCHAR(100) NOT NULL DEFAULT '',
    license_number VARCHAR(50)  NOT NULL UNIQUE,
    email          VARCHAR(100) NOT NULL UNIQUE,
    phone_number   VARCHAR(15) UNIQUE,
    is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
    location       GEOGRAPHY(Point, 4326)
);

CREATE INDEX idx_drivers_location ON drivers USING GIST (location);
CREATE INDEX idx_drivers_is_active ON drivers (is_active);

CREATE TABLE invoices
(
    invoice_id     SERIAL PRIMARY KEY,
    amount         NUMERIC(10, 2) NOT NULL,
    issue_date     TIMESTAMP      NOT NULL DEFAULT NOW(),
    due_date       TIMESTAMP      NOT NULL DEFAULT NOW(),
    payment_status VARCHAR(25)    NOT NULL DEFAULT 'Pending',
    trip_id        INTEGER UNIQUE REFERENCES trips (trip_id) ON DELETE SET NULL
);

CREATE TABLE trips
(
    trip_id        SERIAL PRIMARY KEY,
    passenger_id   INTEGER REFERENCES passengers (passenger_id) ON DELETE CASCADE,
    driver_id      INTEGER        REFERENCES drivers (driver_id) ON DELETE SET NULL,
    invoice_id     INTEGER UNIQUE REFERENCES invoices (invoice_id) ON DELETE SET NULL,
    start_location GEOGRAPHY(Point, 4326),
    end_location   GEOGRAPHY(Point, 4326),
    start_time     TIMESTAMP      NOT NULL DEFAULT NOW(),
    end_time       TIMESTAMP,
    status         VARCHAR(50)    NOT NULL
);

CREATE INDEX idx_trips_start_location ON trips USING GIST (start_location);
CREATE INDEX idx_trips_end_location ON trips USING GIST (end_location);
CREATE INDEX idx_trips_status ON trips (status);

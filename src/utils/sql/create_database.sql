CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS drivers (
    driver_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    location GEOGRAPHY(Point, 4326)
);

CREATE TABLE IF NOT EXISTS passengers (
    passenger_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY,
    passenger_id INTEGER NOT NULL REFERENCES passengers(passenger_id) ON DELETE SET NULL,
    driver_id INTEGER NOT NULL REFERENCES drivers(driver_id) ON DELETE SET NULL,
    start_location GEOGRAPHY(Point, 4326),
    end_location GEOGRAPHY(Point, 4326),
    start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    end_time TIMESTAMP WITHOUT TIME ZONE NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
    invoice_id SERIAL PRIMARY KEY,
    trip_id INTEGER UNIQUE NOT NULL REFERENCES trips(trip_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    issue_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    payment_status VARCHAR(100) NOT NULL
);

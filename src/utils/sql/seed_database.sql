INSERT INTO drivers (full_name, license_number, email, phone_number, is_active, location)
VALUES ('John Smith', 'D123456', 'john.smith@example.com', '555-1234', TRUE,
        ST_SetSRID(ST_MakePoint(-74.0060, 40.7128), 4326)),
       ('Jane Doe', 'D654321', 'jane.doe@example.com', '555-5678', TRUE,
        ST_SetSRID(ST_MakePoint(-74.0059, 40.7127), 4326));

INSERT INTO passengers (full_name, email, phone_number)
VALUES ('Alice Johnson', 'alice.johnson@example.com', '555-9101'),
       ('Bob Brown', 'bob.brown@example.com', '555-3412');

INSERT INTO trips (passenger_id, driver_id, start_location, end_location, start_time, end_time, status)
VALUES ((SELECT passenger_id FROM passengers WHERE email = 'alice.johnson@example.com'),
        (SELECT driver_id FROM drivers WHERE email = 'john.smith@example.com'),
        ST_SetSRID(ST_MakePoint(-74.0060, 40.7128), 4326), ST_SetSRID(ST_MakePoint(-73.935242, 40.730610), 4326),
        TIMESTAMP '2023-10-01 08:00:00', TIMESTAMP '2023-10-01 09:00:00', 'Completed'),
       ((SELECT passenger_id FROM passengers WHERE email = 'bob.brown@example.com'),
        (SELECT driver_id FROM drivers WHERE email = 'jane.doe@example.com'),
        ST_SetSRID(ST_MakePoint(-74.0059, 40.7127), 4326), ST_SetSRID(ST_MakePoint(-73.944217, 40.729824), 4326),
        TIMESTAMP '2023-10-01 10:00:00', NULL, 'Active');

INSERT INTO invoices (trip_id, amount, issue_date, payment_status)
VALUES ((SELECT trip_id FROM trips WHERE status = 'Completed'), 35.50, TIMESTAMP '2023-10-01 09:05:00', 'Paid'),
       ((SELECT trip_id FROM trips WHERE status = 'Active'), 20.00, TIMESTAMP '2023-10-01 10:05:00', 'Pending');
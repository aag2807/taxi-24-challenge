INSERT INTO passengers (full_name, email, phone_number)
VALUES ('John Doe', 'john.doe@example.com', '1234567890'),
       ('Jane Smith', 'jane.smith@example.com', '2345678901'),
       ('Alice Johnson', 'alice.johnson@example.com', '3456789012');

INSERT INTO drivers (full_name, license_number, email, phone_number, is_active, location)
VALUES ('Robert Brown', 'LIC123', 'robert.brown@example.com', '4567890123', TRUE,
        ST_SetSRID(ST_MakePoint(-74.0059, 40.7128), 4326)),
       ('Emily White', 'LIC124', 'emily.white@example.com', '5678901234', TRUE,
        ST_SetSRID(ST_MakePoint(-74.0060, 40.7127), 4326)),
       ('Michael Green', 'LIC125', 'michael.green@example.com', '6789012345', FALSE,
        ST_SetSRID(ST_MakePoint(-74.0061, 40.7126), 4326));

INSERT INTO invoices (amount, issue_date, due_date, payment_status, trip_id)
VALUES (100.00, '2023-04-01 09:00:00', '2023-04-15 09:00:00', 'Pending', NULL),
       (200.00, '2023-04-02 10:00:00', '2023-04-16 10:00:00', 'Paid', NULL),
       (150.00, '2023-04-03 11:00:00', '2023-04-17 11:00:00', 'Pending', NULL);

INSERT INTO trips (passenger_id, driver_id, invoice_id, start_location, end_location, start_time, end_time, status)
VALUES (1, 1, 1, ST_SetSRID(ST_MakePoint(-74.0059, 40.7128), 4326), ST_SetSRID(ST_MakePoint(-74.0159, 40.7228), 4326),
        '2023-04-01 09:00:00', '2023-04-01 09:30:00', 'Completed'),
       (2, 2, 2, ST_SetSRID(ST_MakePoint(-74.0060, 40.7127), 4326), ST_SetSRID(ST_MakePoint(-74.0160, 40.7227), 4326),
        '2023-04-02 10:00:00', '2023-04-02 10:30:00', 'Completed'),
       (3, 3, 3, ST_SetSRID(ST_MakePoint(-74.0061, 40.7126), 4326), ST_SetSRID(ST_MakePoint(-74.0161, 40.7226), 4326),
        '2023-04-03 11:00:00', '2023-04-03 11:30:00', 'Completed');

UPDATE invoices
SET trip_id = 1
WHERE invoice_id = 1;
UPDATE invoices
SET trip_id = 2
WHERE invoice_id = 2;
UPDATE invoices
SET trip_id = 3
WHERE invoice_id = 3;

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE order (
    id SERIAL PRIMARY KEY,
    date_of_sale TIMESTAMP NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL CHECK (shipping_cost >= 0),
    customer_id INT NOT NULL,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) 
        REFERENCES customer(id) 
        ON DELETE CASCADE
);

CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    quantity_sold INT NOT NULL CHECK (quantity_sold >= 1),
    discount DECIMAL(5, 2) NOT NULL CHECK (discount >= 0 AND discount <= 1),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES "order"(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES product(id)
        ON DELETE CASCADE
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL CHECK (length(name) >= 2 AND length(name) <= 150),
    category VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100)
);


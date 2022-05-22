[[USERS]]
id :serial (primary key)
fname: varchar(70)
lname: varchar(70)
password : varchar

endpoints::
index: /users (GET)
show: /users/:id (GET)
create: /users (POST)
delete: /users (delete)
authenticate: /users/authenticate (POST)



[[PRODUCTS]]
id :serial (primary key)
name: varchar(70)
price : integer

endpoints::
index: /products (GET)
show: /products/:id (GET)
create: /products (POST)
delete: /products (delete)



[[ORDERS]]
id :serial (primary key)
user_id: BIGINT REFERENCES users (id)
status : varchar(10)

endpoints::
index: /orders (GET)
show: /orders/:id (GET)
create: /orders (POST)
delete: /orders (delete)



[[ORDER_PRODUCTS]]
id :serial (primary key)
quantity: integer
order_id: BIGINT REFERENCES orders (id)
product_id: BIGINT REFERENCES products (id)

endpont::
addProduct: /orders/:id/products (POST)

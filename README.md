 1) create .env file in the root directory and here is an example for the data you would put in it
  {
  POSTGRES_HOST= 127.0.0.1
  POSTGRES_DB= project
  POSTGRES_DB_TEST= test_project 
  POSTGRES_USER= ###
  POSTGRES_PASSWORD= ###
  ENV=dev
  PEPPERR=###
  SALT_ROUNDS=10
  TOKEN_SECRET= ###
    } 


 2) create database
  CREATE DATABASE project;
  CREATE DATABASE test_project;

  3) database port :5432


 4)to install the node module folder
  npm init -y

 5)install packages
  npm i bcrypt
  npm i body-parser
  npm i dotenv
  npm i express
  npm i jsonwebtoken
  npm i pg
  npm i supertest
  npm i typescript
  npm i --save-dev @types/bcryp
  npm i --save-dev @types/dotenv
  npm i --save-dev @types/express
  npm i --save-dev @types/jasmine
  npm i --save-dev @types/jsonwebtoken
  npm i --save-dev @types/pg
  npm i --save-dev @types/supertest
  npm i --save-dev @typescript-eslint/eslint-plugin
  npm i --save-dev @typescript-eslint/parse
  npm i --save-dev db-migrate
  npm i --save-dev db-migrate-pg
  npm i --save-dev eslint
  npm i --save-dev jasmine
  npm i --save-dev jasmine-spec-reporter
  npm i --save-dev jasmine-ts
  npm i --save-dev prettier
  npm i --save-dev ts-node
  npm i --save-dev tsc-watch

 6) to build the project
  npm run tsc 

 7) to run the migration
  npx db-migrate up

 8)to start the project
  npm run start  

((http://localhost:3000))

 9)to run tests
  npm run test#   p r o j e c t - 2  
 
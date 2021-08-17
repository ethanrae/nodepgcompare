To run this project
* open CLI
* change to this directory
* run `docker-compose up --build`
* Go to http://localhost:4000/
* To stop the entire docker stack `Ctrl+C` or `Ctrl+D` out of the terminal
* To re-init the database, you can delete the docker volumes storing the database data using `docker-compose down -v` when you rerun the docker stack the postgres databases will re-init themselves with a new database and the .sql scripts will rerun.

This docker-compose stack consists of three services:

1. postgres-db-1
    * Connections from your host computer must use localhost:5465 to connect
    * Connections from the docker container node-database-checker can use host.docker.internal:5466 or postgres-db-1:5432
    * Database will be initialized on first boot/run using credentials in docker-compose.yml and init1.sql
2. postgres-db-2
    * Connections from your host computer must use localhost:5465 to connect
    * Connections from the docker container node-database-checker can use host.docker.internal:5466 or postgres-db-2:5432
    * Database will be initialized on first boot/run using credentials in docker-compose.yml and init1.sql
3. node-database-checker
    * Code in app.js
    * Connects to postgres-db-1 using postgres-db-1:5432
    * Connects to postgres-db-2 using postgres-db-2:5432
    * http://localhost:4000/ -> Returns "Hello World"
    * http://localhost:4000/db1 -> Returns query results on database 1
    * http://localhost:4000/db2 -> Returns query results on database 1
    * http://localhost:4000/compare -> Compares query results of database 1 to database 2 in a very manual ugly way.
    

# UCPL Data loader

## Details

* This app loads a database of UCPL job profiles and stores it in your local CouchDB.

## Requirements
* Python
	* MySQL-python
* MySQL
* CouchDB
	
## Usage
* Create a MySQL database using the SQL file that comes attached with the files in this project

	`mysql -p -u root DATABASENAME < ucpl_2013-09-26.sql`
	
* Copy database_config.default.py to database_config.py and populate the variables with the connection information to your MySQL database

* Run CouchDB on localhost and create a database 'ucpl'

* Run profiles_to_couch.py
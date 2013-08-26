# UCPL Job Profiles

## Background

* UCPL is no longer used for performance management
* HR still uses UCPL to manage job profiles
	* profile management is proposed on the ERP roadmap
* UCPL costs approximately $6000 every 6 months in licensing
* HR is looking for a light-weight interim solution

## Overall Goals

* extract job profiles from UCPL into a new database
* create an interface to create, read, update, and delete profiles
	* not intended to be a complete re-imagining
	* should be similar to the existing interface, functionality-wise

## Details and Specifications


* existing profiles are in a single MySQL database table
	* 26 columns
	* jobprofile_id, profile_date, admin_area, dept, ucpl_num, job_family, dev_phase, noc_code, position_num, job_title, job_code, nature_work, position_purpose, qualifications, accountability, tasks, core_comp, staff_sign, staff_date, leader_sign, leader_date, director_sign, director_date, accountability_old, created, updated
* top-level user functions are *Add* and *Search*
* for every job profile, users can:
	* edit, copy, delete
	* email
	* download Word (RTF) and PDF versions

## Technologies

* [CouchBD](http://couchdb.apache.org)
* [Kanso](http://kan.so)
* [DustJS](http://akdubya.github.io/dustjs/)

## Tasks

### Database

* convert existing job profiles into JSON documents
	* poorly encoded characters need to be replaced or stripped out
	* convert dates to ISO 8601 format
		* profile_date, staff_date, leader_date, director_date, created, updated
	* convert number strings into numbers
		* admin_area, dept, jobprofile_id
	* convert "NULL" strings and empty values into nulls
	* change the ucpl_num field to _id (will use as the document ID)
* convert existing employee profiles into JSON documents (only for users with admin privs)
* convert existing faculty and department tables into JSON documents
* set up rewrites in CouchDB to tie all the pages together
* set up Apache or nginx to reverse proxy the database

### HTML Pages

* create an HTML landing page for job profiles (like jobprofiles.php)
* create an HTML page to add new profiles (like jpadd.php)
	* this could be adapted for editing, and copying a profile
* create an HTML page to search for profiles (like jpsearch.php)
* create a list function that outputs a list of profiles (like jplist.php)
* create a show function to delete a profile (like jpdelete.php)
* create a show function to copy a profile (like jpcopy.php)
* create a show function to edit faculty and department information (like admindept.php)
* create a show function to edit user privileges (like privadd.php)
* create a show function to send (email) a profile (like jpsend.php)
* create a design document to hold configuration info (from jpform.php)

### Word and PDF Exports

* create a show function that transforms a profile into an RTF document
	* use the existing RTF template
* create a show function that transforms a profile into a PDF document
	* might need to configure CouchDB to use PHP, Python, or other execution environment

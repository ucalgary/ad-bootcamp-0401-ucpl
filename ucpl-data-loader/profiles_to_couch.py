#!/usr/bin/python
# coding=utf-8

import MySQLdb
from MySQLdb import converters
from database_config import *
import json
import httplib
import sys
from datetime import datetime

def send_profile( profile ):
	http = httplib.HTTPConnection('localhost:5984')
	http.request('POST', '/ucpl', profile, {"Content-type": "application/json", "Accept": "text/plain"})
	response = http.getresponse()
	print (response.read())	

# This doesn't work, the CSV file is too disasterous to be parsed
# with open('jobprofile.csv', 'rb') as csvfile:
# 	contents = csv.DictReader(csvfile, delimiter=',', quotechar='"')
# 	for profile in contents:
# 		send_profile(profile)

# Set up custom MySQL conversion that changes date times into strings
conv=converters.conversions.copy()
conv[12]=str       # convert dates to strings
db = MySQLdb.connect(host=host,user=user,passwd=passwd,db=db,conv=conv)
cursor = db.cursor()
sql = "SELECT * FROM jobprofile"
try:
	cursor.execute(sql)
	results = cursor.fetchall()
	for row in results:
		profile_headers = ['jobprofile_id', 'profile_date', 'admin_area', 'dept', 'ucpl_num', 'job_family', 'dev_phase', 'noc_code', 'position_num', 'job_title', 'job_code', 'nature_work', 'position_purpose', 'qualifications', 'accountability', 'tasks', 'core_comp', 'staff_sign', 'staff_date', 'leader_sign', 'leader_date', 'director_sign', 'director_date', 'accountability_old', 'created', 'updated']
		profile = dict(zip(profile_headers, row))
		# Split out compentencies to improve the data and have it mean something without knowing how the HTML is built
		competency_levels = profile['core_comp'].split('|')
		competencies = ['communication', 'flexibility', 'initiative', 'knowledge', 'leadership', 'personal effectiveness', 'teamwork', 'university understanding']
		profile['core_comp'] = dict(zip(competencies, competency_levels))
		# Ensure ISO-8601 dates
		for key in profile:
			if key in ('profile_date', 'staff_date', 'leader_date', 'director_date', 'created', 'updated'):
				dt = None
				for dt_format in ('%Y-%m-%d %I:%M:%S %p', '%Y-%m-%d %H:%M:%S', '%Y-%m-%d'):
					try:
						dt = datetime.strptime(profile[key], dt_format)
						break
					except:
						continue
				profile[key] = dt.isoformat() if dt else None
			elif key in ('admin_area', 'dept', 'jobprofile_id'):
				try:
					row[key] = int(profile[key])
				except:
					pass
		send_profile(json.dumps(profile))
except:
	print "Error: unable to fetch data"

exports.depts = {
	map: function(doc) {
		if (doc.faculty_descr) {
	 		emit(doc.faculty_descr, {"departments":doc.departments, "faculty_code":doc.faculty_code});
		}
	}
}
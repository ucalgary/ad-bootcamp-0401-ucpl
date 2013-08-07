exports.views = {
	depts: {
		map: function(doc) {
			emit(doc.dept, null);
		}
	}
}
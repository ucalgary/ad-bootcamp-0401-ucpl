var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;

exports.jpedit = function (doc, req) {
	var form = new Form({
		tasks: fields.string(),
		noc_code: fields.string(),
		profile_date: fields.string(),
		leader_date: fields.string(),
		accountability: fields.string(),
		staff_sign: fields.string(),
		director_sign: fields.string(),
		core_comp: fields.string(),
		position_purpose: fields.string(),
		job_title: fields.string(),
		nature_work: fields.string(),
		accountability_old: fields.string(),
		updated: fields.string(),
		leader_sign: fields.string(),
		qualifications: fields.string(),
		admin_area: fields.string(),
		job_code: fields.string(),
		dev_phase: fields.string(),
		position_num: fields.string(),
		staff_date: fields.string(),
		created: fields.string(),
		dept: fields.string(),
		director_date: fields.string(),
		job_family: fields.string(),
	});
	form.validate(req);

	if (form.isValid()) {
		return [form.values, toJSON(form.values)];
	} else {
		return [null, "Failed validation. Fix the errors."];
	}
};

exports.jpdelete = function (doc, req) {
  deleted = {
    _id : doc._id,
    _rev : doc._rev,
    _deleted : true
  };
  return [deleted, "Deleted: " + doc._id];
};

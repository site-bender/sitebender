const IsBeforeDate =
	(datatype = "Date") =>
	operand =>
	test => ({
		tag: "IsBeforeDate",
		datatype,
		operand,
		test,
	})

export default IsBeforeDate

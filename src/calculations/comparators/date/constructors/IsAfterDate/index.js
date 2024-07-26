const IsAfterDate =
	(datatype = "Date") =>
	operand =>
	test => ({
		tag: "IsAfterDate",
		datatype,
		operand,
		test,
	})

export default IsAfterDate

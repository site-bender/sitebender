const IsNotAfterDate =
	(datatype = "Date") =>
	operand =>
	test => ({
		tag: "IsNotAfterDate",
		datatype,
		operand,
		test,
	})

export default IsNotAfterDate

const IsNotBeforeDate =
	(datatype = "Date") =>
	operand =>
	test => ({
		tag: "IsNotBeforeDate",
		datatype,
		operand,
		test,
	})

export default IsNotBeforeDate

const IsSuperset =
	(datatype = "Set") =>
	operand =>
	test => ({
		tag: "IsSuperset",
		datatype,
		operand,
		test,
	})

export default IsSuperset

const IsLongerThan =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsLongerThan",
		datatype,
		operand,
		test,
	})

export default IsLongerThan

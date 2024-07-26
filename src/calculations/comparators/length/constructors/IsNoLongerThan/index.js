const IsNoLongerThan =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsNoLongerThan",
		datatype,
		operand,
		test,
	})

export default IsNoLongerThan

const IsNoMoreThan =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsNoMoreThan",
		datatype,
		operand,
		test,
	})

export default IsNoMoreThan

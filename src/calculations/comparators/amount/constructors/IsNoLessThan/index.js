const IsNoLessThan =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsNoLessThan",
		datatype,
		operand,
		test,
	})

export default IsNoLessThan

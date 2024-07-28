const IsUnequalTo =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsUnequalTo",
		datatype,
		operand,
		test,
	})

export default IsUnequalTo

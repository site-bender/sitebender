const IsLessThan =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsLessThan",
		datatype,
		operand,
		test,
	})

export default IsLessThan

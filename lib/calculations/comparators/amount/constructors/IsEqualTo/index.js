const IsEqualTo =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsEqualTo",
		datatype,
		operand,
		test,
	})

export default IsEqualTo

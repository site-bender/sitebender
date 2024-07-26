const IsNotLength =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsNotLength",
		datatype,
		operand,
		test,
	})

export default IsNotLength

const IsLength =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsLength",
		datatype,
		operand,
		test,
	})

export default IsLength

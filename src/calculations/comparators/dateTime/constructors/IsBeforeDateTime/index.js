const IsBeforeDateTime =
	(datatype = "DateTime") =>
	operand =>
	test => ({
		tag: "IsBeforeDateTime",
		datatype,
		operand,
		test,
	})

export default IsBeforeDateTime

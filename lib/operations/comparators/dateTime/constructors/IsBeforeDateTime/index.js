const IsBeforeDateTime =
	(datatype = "PlainDateTime") =>
	operand =>
	test => ({
		tag: "IsBeforeDateTime",
		datatype,
		operand,
		test,
	})

export default IsBeforeDateTime

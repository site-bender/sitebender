const IsAfterDateTime =
	(datatype = "PlainDateTime") =>
	operand =>
	test => ({
		tag: "IsAfterDateTime",
		datatype,
		operand,
		test,
	})

export default IsAfterDateTime

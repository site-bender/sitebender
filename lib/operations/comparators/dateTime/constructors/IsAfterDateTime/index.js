const IsAfterDateTime =
	(datatype = "DateTime") =>
	operand =>
	test => ({
		tag: "IsAfterDateTime",
		datatype,
		operand,
		test,
	})

export default IsAfterDateTime

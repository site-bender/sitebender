const makeDateConstructor =
	tag =>
	(datatype = "PlainDate") =>
	operand =>
	test => ({
		tag,
		datatype,
		operand,
		test,
	})

export default makeDateConstructor

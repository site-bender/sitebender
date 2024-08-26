const makeLengthConstructor =
	tag =>
	(datatype = "String") =>
	operand =>
	test => ({
		tag,
		datatype,
		operand,
		test,
	})

export default makeLengthConstructor

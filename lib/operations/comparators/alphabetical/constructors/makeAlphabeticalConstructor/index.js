const makeAlphabeticalConstructor =
	tag =>
	(datatype = "String") =>
	operand =>
	test => ({
		tag,
		datatype,
		operand,
		test,
	})

export default makeAlphabeticalConstructor

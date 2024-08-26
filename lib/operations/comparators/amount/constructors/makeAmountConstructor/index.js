const makeAmountConstructor =
	tag =>
	(datatype = "Number") =>
	operand =>
	test => ({
		tag,
		datatype,
		operand,
		test,
	})

export default makeAmountConstructor

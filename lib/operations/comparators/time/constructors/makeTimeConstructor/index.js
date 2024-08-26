const makeTimeConstructor =
	tag =>
	(datatype = "PlainTime") =>
	operand =>
	test => ({
		tag,
		datatype,
		operand,
		test,
	})

export default makeTimeConstructor

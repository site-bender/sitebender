const IsMember =
	(datatype = "Member") =>
	operand =>
	test => ({
		tag: "IsMember",
		datatype,
		operand,
		test,
	})

export default IsMember

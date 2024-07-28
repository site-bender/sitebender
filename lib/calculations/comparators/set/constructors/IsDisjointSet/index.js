const IsDisjointSet =
	(datatype = "Set") =>
	operand =>
	test => ({
		tag: "IsDisjointSet",
		datatype,
		operand,
		test,
	})

export default IsDisjointSet

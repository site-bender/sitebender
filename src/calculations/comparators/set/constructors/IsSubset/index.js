const IsSubset =
	(datatype = "Set") =>
	operand =>
	test => ({
		tag: "IsSubset",
		datatype,
		operand,
		test,
	})

export default IsSubset

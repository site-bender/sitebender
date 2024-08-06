const IsOverlappingSet =
	(datatype = "Set") =>
	operand =>
	test => ({
		tag: "IsOverlappingSet",
		datatype,
		operand,
		test,
	})

export default IsOverlappingSet

const IsAscending =
	(datatype = "Array") =>
	operand => ({
		tag: "IsAscending",
		datatype,
		operand,
	})

export default IsAscending

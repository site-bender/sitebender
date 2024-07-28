const IsDescending =
	(datatype = "Array") =>
	operand => ({
		tag: "IsDescending",
		datatype,
		operand,
	})

export default IsDescending

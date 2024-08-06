const Or =
	datatype =>
	(operands = []) => ({
		tag: "Or",
		operands,
		datatype,
	})

export default Or

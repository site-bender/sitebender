const And =
	datatype =>
	(operands = []) => ({
		tag: "And",
		operands,
		datatype,
	})

export default And

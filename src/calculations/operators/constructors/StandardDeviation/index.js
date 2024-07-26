const StandardDeviation =
	(datatype = "Number") =>
	(operands = []) =>
	(usePopulation = false) => ({
		tag: "StandardDeviation",
		operands,
		datatype,
		usePopulation,
	})

export default StandardDeviation

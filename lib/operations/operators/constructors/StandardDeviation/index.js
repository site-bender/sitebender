const StandardDeviation =
	(datatype = "Number") =>
	(usePopulation = false) =>
	(operands = []) => ({
		tag: "StandardDeviation",
		operands,
		datatype,
		usePopulation,
	})

export default StandardDeviation

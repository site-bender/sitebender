const Root =
	(datatype = "Number") =>
	radicand =>
	index => ({
		tag: "Root",
		radicand,
		index,
		datatype,
	})

export default Root

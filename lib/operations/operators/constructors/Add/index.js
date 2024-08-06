const Add =
	(datatype = "Number") =>
	(addends = []) => ({
		tag: "Add",
		addends,
		datatype,
	})

export default Add

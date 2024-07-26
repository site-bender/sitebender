const Lookup =
	(datatype = "Json") =>
	id =>
	value => ({
		attributes: {
			class: "lookup",
			id,
			value: value,
		},
		dataset: {
			type: datatype,
		},
		tag: "Data",
	})

export default Lookup

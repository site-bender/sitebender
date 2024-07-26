const LookupTable =
	(datatype = "Json") =>
	id =>
	table => ({
		attributes: {
			class: "lookup-table",
			id,
			value: table,
		},
		dataset: {
			type: datatype,
		},
		tag: "Data",
	})

export default LookupTable

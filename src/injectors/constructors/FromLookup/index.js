const FromLookup =
	(datatype = "Json") =>
	id => ({
		tag: "FromLookup",
		datatype,
		source: { class: "lookup", id },
	})

export default FromLookup

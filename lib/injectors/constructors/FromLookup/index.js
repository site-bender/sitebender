const FromLookup =
	(datatype = "Json") =>
	id => ({
		tag: "FromLookup",
		datatype,
		source: { class: "lookup", id, local: id },
	})

export default FromLookup

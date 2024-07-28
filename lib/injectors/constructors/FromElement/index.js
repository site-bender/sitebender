const FromElement =
	(datatype = "Number") =>
	source => ({
		tag: "FromElement",
		datatype,
		source,
	})

export default FromElement

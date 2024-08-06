const Power =
	(datatype = "Number") =>
	base =>
	exponent => ({
		tag: "Power",
		base,
		exponent,
		datatype,
	})

export default Power

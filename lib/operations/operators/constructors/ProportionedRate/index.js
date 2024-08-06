const ProportionedRate =
	(datatype = "Number") =>
	table =>
	amount => ({
		tag: "ProportionedRate",
		amount,
		datatype,
		table,
	})

export default ProportionedRate

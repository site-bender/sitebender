const FromUrlParameter =
	(datatype = "Number") =>
	(options = {}) => ({
		tag: "FromUrlParameter",
		datatype,
		options,
	})

export default FromUrlParameter

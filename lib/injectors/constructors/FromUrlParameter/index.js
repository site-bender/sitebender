const FromUrlParameter =
	(datatype = "Number") =>
	segment => ({
		tag: "FromUrlParameter",
		datatype,
		segment,
	})

export default FromUrlParameter

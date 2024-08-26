const FromQueryString =
	(datatype = "Number") =>
	key => ({
		tag: "FromQueryString",
		datatype,
		key,
		options: {
			local: key,
		},
	})

export default FromQueryString

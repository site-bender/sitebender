const FromQueryString =
	(datatype = "Number") =>
	key => ({
		tag: "FromQueryString",
		datatype,
		key,
	})

export default FromQueryString

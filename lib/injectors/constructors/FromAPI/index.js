const FromAPI =
	(datatype = "Json") =>
	(options = {}) => ({
		tag: "FromAPI",
		datatype,
		...options,
	})

export default FromAPI

const FromSessionStorage =
	(datatype = "Number") =>
	key => ({
		tag: "FromSessionStorage",
		datatype,
		key,
		options: {
			local: key,
		},
	})

export default FromSessionStorage

const FromSessionStorage =
	(datatype = "Number") =>
	key => ({
		tag: "FromSessionStorage",
		datatype,
		key,
	})

export default FromSessionStorage

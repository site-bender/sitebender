const FromLocalStorage =
	(datatype = "Number") =>
	key => ({
		tag: "FromLocalStorage",
		datatype,
		key,
		options: {
			local: key,
		},
	})

export default FromLocalStorage

const FromLocalStorage =
	(datatype = "Number") =>
	key => ({
		tag: "FromLocalStorage",
		datatype,
		key,
	})

export default FromLocalStorage

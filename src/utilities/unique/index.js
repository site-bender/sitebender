const unique = (arr) =>
	arr.filter((value, index, self) => self.indexOf(value) === index)

export default unique

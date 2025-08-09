const match = (re) => (str) => {
	const m = str.match(new RegExp(re, "g"))

	return m == null ? [] : m
}

export default match

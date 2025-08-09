const replaceAll = (r) => (substitute) => (str) =>
	str.replaceAll(
		typeof r === "string" ? r : new RegExp(r, `${r.flags}g`),
		substitute,
	)

export default replaceAll

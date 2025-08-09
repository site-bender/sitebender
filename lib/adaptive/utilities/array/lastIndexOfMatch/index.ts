const lastIndexOfMatch = (re) => (arr) => {
	const index = arr.reduce(
		(out, item, index) => (new RegExp(re).test(item) ? index : out),
		-1,
	)

	return index < 0 ? undefined : index
}

export default lastIndexOfMatch

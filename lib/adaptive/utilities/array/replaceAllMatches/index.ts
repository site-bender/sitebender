const replaceAllMatches = (re) => (f) => (arr) =>
	arr.map((item) => (re.test(item) ? f(item) : item))

export default replaceAllMatches

const replaceAll = (i) => (f) => (arr) =>
	arr.map((item) => (item === i ? f(item) : item))

export default replaceAll

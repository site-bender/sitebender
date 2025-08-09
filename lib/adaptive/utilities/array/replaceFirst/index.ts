import replaceAt from "../replaceAt.js"

const replaceFirst = (item) => (f) => (arr) =>
	replaceAt(arr.indexOf(item))(f)(arr)

export default replaceFirst

import replaceAt from "../replaceAt.js"

const replaceLast = (item) => (f) => (arr) =>
	replaceAt(arr.lastIndexOf(item))(f)(arr)

export default replaceLast

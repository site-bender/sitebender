const replaceAt = (i) => (f) => (arr) =>
	i < 0 || i >= arr.length ? arr : arr
		.slice(0, i)
		.concat(f(arr[i]))
		.concat(arr.slice(i + 1))

export default replaceAt

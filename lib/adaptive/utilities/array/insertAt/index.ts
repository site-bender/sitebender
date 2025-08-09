const insertAt = (i) => (item) => (arr) =>
	i >= 0 && i < arr.length + 1
		? arr.slice(0, i).concat([item]).concat(arr.slice(i))
		: arr

export default insertAt

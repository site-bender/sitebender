import filter from "../filter.js"

const removeAll = (item) => (arr) => {
	return filter((i) => i !== item)(arr)
}

export default removeAll

import filter from "../filter"

const removeAll = item => arr => {
	return filter(i => i !== item)(arr)
}

export default removeAll

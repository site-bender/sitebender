import isUndefined from "../../isUndefined"
import findLastIndex from "../findLastIndex"
import replaceAt from "../replaceAt.js"

const replaceLastMatch = (re) => (f) => (arr) => {
	const index = findLastIndex((item) => new RegExp(re).test(item))(arr)

	return isUndefined(index) ? arr : replaceAt(index)(f)(arr)
}

export default replaceLastMatch

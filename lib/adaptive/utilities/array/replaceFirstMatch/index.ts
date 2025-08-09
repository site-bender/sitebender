import isUndefined from "../../isUndefined"
import findIndex from "../findIndex"
import replaceAt from "../replaceAt.js"

const replaceFirstMatch = (re) => (f) => (arr) => {
	const index = findIndex((item) => re.test(item))(arr)

	return isUndefined(index) ? arr : replaceAt(index)(f)(arr)
}

export default replaceFirstMatch

import pipe from "../../functions/pipe"
import insertAt from "../insertAt"
import removeAt from "../removeAt.js"

const move = (i) => (j) => (arr) => {
	if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
		const toMove = arr[i]

		return pipe([removeAt(i), insertAt(j)(toMove)])(arr)
	}

	return arr
}

export default move

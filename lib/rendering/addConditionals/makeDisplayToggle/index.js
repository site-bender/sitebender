import moveElementToDisplayCache from "./moveElementToDisplayCache"
import replaceElementFromDisplayCache from "./replaceElementFromDisplayCache"

const makeDisplayToggle = id => testCondition => arg => {
	if (id) {
		const test = testCondition(arg)

		test ? replaceElementFromDisplayCache(id) : moveElementToDisplayCache(id)
	}
}

export default makeDisplayToggle

import moveElementToDisplayCache from "./moveElementToDisplayCache"
import replaceElementFromDisplayCache from "./replaceElementFromDisplayCache"

const makeDisplayToggle = id => testCondition => async arg => {
	if (id) {
		const test = await testCondition(arg)

		test ? replaceElementFromDisplayCache(id) : moveElementToDisplayCache(id)
	}
}

export default makeDisplayToggle

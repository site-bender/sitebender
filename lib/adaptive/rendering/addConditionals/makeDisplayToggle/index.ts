import moveElementToDisplayCache from "./moveElementToDisplayCache"
import replaceElementFromDisplayCache from "./replaceElementFromDisplayCache"

const makeDisplayToggle =
	(id) => (testCondition) => async (arg, localValues) => {
		if (id) {
			const test = await testCondition(arg, localValues)

			test ? replaceElementFromDisplayCache(id) : moveElementToDisplayCache(id)
		}
	}

export default makeDisplayToggle

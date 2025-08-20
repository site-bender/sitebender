import moveElementToDisplayCache from "./moveElementToDisplayCache/index.ts"
import replaceElementFromDisplayCache from "./replaceElementFromDisplayCache/index.ts"

const makeDisplayToggle =
	(id) => (testCondition) => async (arg, localValues) => {
		if (id) {
			const test = await testCondition(arg, localValues)

			test ? replaceElementFromDisplayCache(id) : moveElementToDisplayCache(id)
		}
	}

export default makeDisplayToggle

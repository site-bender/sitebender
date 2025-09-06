import type { LocalValues } from "../../../../types/index.ts"

import moveElementToDisplayCache from "./moveElementToDisplayCache/index.ts"
import replaceElementFromDisplayCache from "./replaceElementFromDisplayCache/index.ts"

type TestFn = (arg: unknown, localValues?: LocalValues) => Promise<boolean>

const makeDisplayToggle =
	(id: string) =>
	(testCondition: TestFn) =>
	async (arg: unknown, localValues?: LocalValues) => {
		if (id) {
			const test = await testCondition(arg, localValues)
			test
				? replaceElementFromDisplayCache(id)
				: moveElementToDisplayCache(id)
		}
	}

export default makeDisplayToggle

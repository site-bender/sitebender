import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import find from "@sitebender/toolsmith/vanilla/array/find/index.ts"
import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"

import flatMapDescendants from "./flatMapDescendants/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hasDescendant =
	(config: ElementConfig) => (tags: readonly string[]): boolean => {
		const { children = [] } = config
		const descendants = flatMapDescendants(children)

		return Boolean(
			find((descendant: string) => includes(descendant)([...tags]))([
				...descendants,
			]),
		)
	}

export default hasDescendant

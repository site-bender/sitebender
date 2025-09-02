import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"

import find from "@toolkit/simple/array/find/index.ts"
import includes from "@toolkit/simple/array/includes/index.ts"

import flatMapDescendants from "./flatMapDescendants/index.ts"

/**
 * Checks if an element has descendants with specific tags
 *
 * @param config - Element configuration
 * @returns Function that checks if any descendants match the given tags
 */
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

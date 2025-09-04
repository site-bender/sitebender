import type { Value } from "@sitebender/engine-types/index.ts"

import generateShortId from "@sitebender/engine/pending/misc/generateShortId/index.ts"

/**
 * Processes ID attribute value and returns appropriate object
 *
 * @param id - ID value (string, boolean, null, or undefined)
 * @returns Object with id property or empty object
 */
export const getId = (id: Value): Record<string, string> => {
	if (id === true || id === undefined) {
		return { id: generateShortId() }
	}

	if (id === false || id === null) {
		return {}
	}

	if (typeof id === "string") {
		return { id }
	}

	return {}
}

export default getId

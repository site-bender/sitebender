import type { Value } from "@sitebender/architect-types/index.ts"

import generateShortId from "@sitebender/architect/pending/misc/generateShortId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

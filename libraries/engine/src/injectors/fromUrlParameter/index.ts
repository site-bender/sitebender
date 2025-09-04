import getFromLocal from "@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolkit/simple/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import getByPattern from "./getByPattern/index.ts"
import getBySegment from "./getBySegment/index.ts"

// deno-lint-ignore no-explicit-any
const fromUrlParameter = (op: any = {}) =>
(
	_arg: unknown,
	localValues?: Record<string, unknown>,
) => {
	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return Promise.resolve(local)
	}

	const opts =
		(op && typeof op === "object"
			? (op as { options?: { pattern?: string; segment?: number } }).options
			: undefined) ?? {}
	const { pattern, segment } = opts as { pattern?: string; segment?: number }

	if (isDefined(segment)) {
		return Promise.resolve(getBySegment(op))
	}

	if (isDefined(pattern)) {
		return Promise.resolve(getByPattern(op))
	}

	return Promise.resolve({
		left: [
			Error("FromUrlParameter")("FromUrlParameter")("Invalid parameters."),
		],
	})
}

export default fromUrlParameter

import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"

import type { Either, ArchitectError, Value } from "../../../../../types/index.ts"

export type SelectorOp = {
	id?: string
	name?: string
	source?: { local?: string; id?: string; name?: string }
	options?: { local?: string; id?: string; name?: string }
}

const getFromLocal = (op: SelectorOp) =>
(
	localValues?: Record<string, unknown>,
): Either<Array<ArchitectError>, Value> | undefined => {
	if (isDefined(localValues)) {
		// Check direct properties first, then nested source/options
		const src = (op.source || op.options || {}) as {
			local?: string
			id?: string
			name?: string
		}
		const { local, id, name } = src
		const key = local || id || name

		// Check if localValues has the key, or if localValues.id matches
		const dict = localValues as Record<string, unknown> & {
			id?: string
			name?: string
			value?: unknown
		}
		const value = (key ? dict[key] : undefined) ??
			(op.id && (dict.id === op.id) ? dict.value : undefined) ??
			(op.name && (dict.name === op.name) ? dict.value : undefined)

		if (isDefined(value)) {
			return { right: value as Value }
		}

		// Only return error if we expected to find something
		if (key && dict[key] === undefined) {
			return undefined // Let it fall through to DOM
		}
	}

	return undefined
}

export default getFromLocal

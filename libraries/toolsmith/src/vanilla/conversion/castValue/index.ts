import type { CastResult, CastType } from "../../../types/conversion/index.ts"

import toBoolean from "./toBoolean/index.ts"
import toFloat from "./toFloat/index.ts"
import toInteger from "./toInteger/index.ts"
import toString from "./toString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function castValue<T extends CastType>(type: T) {
	return function castValueInner(value: unknown): CastResult<T> {
		switch (type) {
			case "boolean":
				return toBoolean(value) as CastResult<T>
			case "float":
				return toFloat(value) as CastResult<T>
			case "integer":
				return toInteger(value) as CastResult<T>
			case "string":
				return toString(value) as CastResult<T>
			default: {
				// TypeScript exhaustiveness check
				const _exhaustive: never = type
				throw new Error(`Unknown cast type: ${_exhaustive}`)
			}
		}
	}
}

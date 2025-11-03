import type { Serializable } from "../../../types/index.ts"

import isSerializable from "../../validation/isSerializable/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toJson(
	indent: number = 0,
): (value?: Serializable) => string | null {
	return function toJsonInner(value?: Serializable): string | null {
		// Handle serializable values first (positive path)
		if (isSerializable(value)) {
			try {
				// Use indent for pretty printing (0 means no formatting)
				const space = indent > 0 ? indent : undefined
				return JSON.stringify(value, null, space)
			} catch {
				// Return null for circular references or other serialization errors
				return null
			}
		}

		// Non-serializable values
		return null
	}
}

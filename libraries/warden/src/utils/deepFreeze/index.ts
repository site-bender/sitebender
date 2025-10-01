//++ Recursively freezes an object and all its properties to ensure immutability

import map from "../../../../../../../toolsmith/src/vanilla/array/map/index.ts"
import createPropertyFreezer from "./createPropertyFreezer/index.ts"

export default function deepFreeze<T>(obj: T): T {
	Object.freeze(obj)

	if (obj !== null && typeof obj === "object") {
		const props = Object.getOwnPropertyNames(obj)
		const freezeProperty = createPropertyFreezer(obj)(deepFreeze)

		map(freezeProperty)(props)
	}

	return obj
}

// const mutable = { a: 1, b: { c: 2 } }
// const frozen = deepFreeze(mutable)
// frozen.a = 2 // Throws in strict mode, silently fails otherwise
// frozen.b.c = 3 // Also frozen recursively

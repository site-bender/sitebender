import type { HashInput } from "../../../types/index.ts"

import isString from "../../../../../vanilla/validation/isString/index.ts"

//++ Normalizes various input types to Uint8Array for hashing

export default function normalizeInput(input: HashInput): Uint8Array {
	if (isString(input)) {
		return new TextEncoder().encode(input)
	}

	if (input instanceof ArrayBuffer) {
		return new Uint8Array(input)
	}

	if (input instanceof Uint8Array) {
		return input
	}

	throw new Error(`Invalid input type for hashing: ${typeof input}`)
}

// normalizeInput("hello") // Returns Uint8Array of UTF-8 bytes
// normalizeInput(new ArrayBuffer(8)) // Returns Uint8Array view
// normalizeInput(new Uint8Array([1,2,3])) // Returns same array

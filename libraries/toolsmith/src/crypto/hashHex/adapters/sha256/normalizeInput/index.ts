import type { HashInput } from "../../../types/index.ts"

import isString from "../../../../../predicates/isString/index.ts"

//++ Normalizes various input types to Uint8Array for hashing

export default function normalizeInput(input: HashInput): Uint8Array {
	if (isString(input)) {
		//++ [EXCEPTION] TextEncoder().encode() permitted in Toolsmith for performance - provides UTF-8 encoding wrapper
		return new TextEncoder().encode(input)
	}

	//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides type checking wrapper
	if (input instanceof ArrayBuffer) {
		//++ [EXCEPTION] Uint8Array constructor permitted in Toolsmith for performance - provides typed array wrapper
		return new Uint8Array(input)
	}

	//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides type checking wrapper
	if (input instanceof Uint8Array) {
		return input
	}

	//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking wrapper
	throw new Error(`Invalid input type for hashing: ${typeof input}`)
}

// normalizeInput("hello") // Returns Uint8Array of UTF-8 bytes
// normalizeInput(new ArrayBuffer(8)) // Returns Uint8Array view
// normalizeInput(new Uint8Array([1,2,3])) // Returns same array

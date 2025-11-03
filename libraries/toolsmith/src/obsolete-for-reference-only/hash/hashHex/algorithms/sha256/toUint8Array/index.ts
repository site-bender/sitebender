//++ Convert input (string | ArrayBuffer | Uint8Array) to Uint8Array (UTF-8 encode strings)
export function toUint8Array(
	input: ArrayBuffer | Uint8Array | string,
): Uint8Array {
	if (typeof input === "string") {
		return new TextEncoder().encode(input)
	}

	if (input instanceof Uint8Array) {
		return input
	}

	return new Uint8Array(input)
}

export default toUint8Array

import join from "../../../../array/join/index.ts"
import map from "../../../../array/map/index.ts"

//++ Converts a Uint8Array to hexadecimal string representation

export default function bytesToHex(bytes: Uint8Array): string {
	const byteArray = Array.from(bytes)

	const hexStrings = map((byte: number) => {
		const hex = byte.toString(16)
		return hex.length === 1 ? "0" + hex : hex
	})(byteArray)

	return join("")(hexStrings)
}

// bytesToHex(new Uint8Array([255, 0, 128])) // "ff0080"
// bytesToHex(new Uint8Array([1, 2, 3])) // "010203"

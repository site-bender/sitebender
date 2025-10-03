//++ Creates composite key from two character codes for operator lookup (curried)
export default function makeCompositeKey(code1: number) {
	return function makeCompositeKeyWithSecondCode(code2: number): string {
		const hex1 = code1.toString(16).toUpperCase().padStart(4, "0")
		const hex2 = code2.toString(16).toUpperCase().padStart(4, "0")

		return `0x${hex1}_0x${hex2}`
	}
}

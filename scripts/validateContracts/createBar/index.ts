import repeat from "@sitebender/toolkit/vanilla/string/repeat/index.ts"

//++ Creates a bar string of equal signs
export default function createBar(length: number): string {
	return repeat("=")(length)
}
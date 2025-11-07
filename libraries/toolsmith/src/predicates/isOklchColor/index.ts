import type { OklchColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Regex pattern for oklch color: oklch(L C H) or oklch(L C H / A)
const OKLCH_PATTERN =
	/^oklch\s*\(\s*(-?[0-9.]+%?)\s+(-?[0-9.]+)\s+(-?[0-9.]+)\s*(?:\/\s*(-?[0-9.]+))?\s*\)$/i

//++ Type predicate that checks if a string is a valid OKLCH color
export default function isOklchColor(value: string): value is OklchColor {
	//++ [EXCEPTION] typeof, !==, ||, .length, ===, .match(), [], .endsWith(), .slice(), parseFloat, /, <, >, and ! permitted in Toolsmith for performance - provides OKLCH color validation wrapper
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	const match = value.match(OKLCH_PATTERN)
	if (!match) {
		return false
	}

	const lightnessStr = match[1]
	const chromaStr = match[2]
	const hueStr = match[3]
	const alphaStr = match[4]

	//++ Parse and validate lightness
	const lightness = lightnessStr.endsWith("%")
		? parseFloat(lightnessStr.slice(0, -1)) / 100
		: parseFloat(lightnessStr)

	if (lightness < 0 || lightness > 1) {
		return false
	}

	//++ Parse and validate chroma
	const chroma = parseFloat(chromaStr)
	if (chroma < 0) {
		return false
	}

	//++ Parse and validate hue
	const hue = parseFloat(hueStr)
	if (hue < 0 || hue > 360) {
		return false
	}

	//++ Parse and validate optional alpha
	if (alphaStr) {
		const alpha = parseFloat(alphaStr)
		if (alpha < 0 || alpha > 1) {
			return false
		}
	}

	return true
}

import type { P3Color } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Regex pattern for P3 color: color(display-p3 R G B) or color(display-p3 R G B / A)
const P3_PATTERN =
	/^color\s*\(\s*display-p3\s+([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+%?)\s*(?:\/\s*([0-9.]+))?\s*\)$/i

//++ Type predicate that checks if a string is a valid Display P3 color
export default function isP3Color(value: string): value is P3Color {
	//++ [EXCEPTION] typeof, !==, ||, .length, ===, .match(), [], .endsWith(), .slice(), parseFloat, /, <, >, and ! permitted in Toolsmith for performance - provides P3 color validation wrapper
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	const match = value.match(P3_PATTERN)
	if (!match) {
		return false
	}

	const redStr = match[1]
	const greenStr = match[2]
	const blueStr = match[3]
	const alphaStr = match[4]

	//++ Parse and validate red
	const red = redStr.endsWith("%")
		? parseFloat(redStr.slice(0, -1)) / 100
		: parseFloat(redStr)

	if (red < 0 || red > 1) {
		return false
	}

	//++ Parse and validate green
	const green = greenStr.endsWith("%")
		? parseFloat(greenStr.slice(0, -1)) / 100
		: parseFloat(greenStr)

	if (green < 0 || green > 1) {
		return false
	}

	//++ Parse and validate blue
	const blue = blueStr.endsWith("%")
		? parseFloat(blueStr.slice(0, -1)) / 100
		: parseFloat(blueStr)

	if (blue < 0 || blue > 1) {
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

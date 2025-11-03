import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { OklchColor } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeOklchColor from "@sitebender/toolsmith/newtypes/stringTypes/oklchColor/unsafeOklchColor/index.ts"

//++ Regex pattern for oklch color: oklch(L C H) or oklch(L C H / A)
const OKLCH_PATTERN =
	/^oklch\s*\(\s*(-?[0-9.]+%?)\s+(-?[0-9.]+)\s+(-?[0-9.]+)\s*(?:\/\s*(-?[0-9.]+))?\s*\)$/i

//++ Smart constructor that validates and creates an OklchColor value
//++ Validates OKLCH color format with lightness (0-1), chroma (0-1), hue (0-360), optional alpha (0-1)
export default function oklchColor(
	value: string,
): Result<ValidationError, OklchColor> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides OklchColor validation wrapper
	if (value.length === 0) {
		return error({
			code: "OKLCH_COLOR_EMPTY",
			field: "oklchColor",
			messages: ["The system needs a non-empty OKLCH color string."],
			received: value,
			expected: "OKLCH color in oklch(L C H) or oklch(L C H / A) format",
			suggestion:
				"Provide an OKLCH color like 'oklch(0.5 0.1 120)' or 'oklch(50% 0.1 120 / 0.8)'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .match() permitted in Toolsmith for performance - provides OklchColor validation wrapper
	const match = value.match(OKLCH_PATTERN)
	if (!match) {
		return error({
			code: "OKLCH_COLOR_INVALID_FORMAT",
			field: "oklchColor",
			messages: ["The system needs a valid OKLCH color format."],
			received: value,
			expected:
				"oklch(lightness chroma hue) or oklch(lightness chroma hue / alpha)",
			suggestion:
				"Use format like 'oklch(0.5 0.1 120)' or 'oklch(50% 0.1 120 / 0.8)'",
			examples: [
				"oklch(0.5 0.1 120)",
				"oklch(50% 0.1 120)",
				"oklch(0.5 0.1 120 / 0.8)",
			],
			severity: "requirement",
		})
	}

	const lightnessStr = match[1]
	const chromaStr = match[2]
	const hueStr = match[3]
	const alphaStr = match[4]

	//++ [EXCEPTION] .endsWith(), parseFloat, .slice(), /, <, >, and || permitted in Toolsmith for performance - provides OklchColor validation wrapper
	//++ Parse lightness (can be percentage or decimal)
	const lightness = lightnessStr.endsWith("%")
		? parseFloat(lightnessStr.slice(0, -1)) / 100
		: parseFloat(lightnessStr)

	if (lightness < 0 || lightness > 1) {
		return error({
			code: "OKLCH_COLOR_INVALID_LIGHTNESS",
			field: "oklchColor",
			messages: [
				"The system needs lightness between 0 and 1 (or 0% and 100%).",
			],
			received: value,
			expected: "Lightness: 0-1 or 0%-100%",
			suggestion: "Use a lightness value like 0.5 or 50%",
			constraints: { min: 0, max: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] parseFloat and < permitted in Toolsmith for performance - provides OklchColor validation wrapper
	//++ Parse chroma (unitless, 0-1 typical but can exceed 1 for wide gamut)
	const chroma = parseFloat(chromaStr)
	if (chroma < 0) {
		return error({
			code: "OKLCH_COLOR_INVALID_CHROMA",
			field: "oklchColor",
			messages: ["The system needs chroma to be non-negative."],
			received: value,
			expected: "Chroma: 0 or greater (typically 0-1)",
			suggestion: "Use a chroma value like 0.1 or 0.2",
			constraints: { min: 0 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] parseFloat, <, >, and || permitted in Toolsmith for performance - provides OklchColor validation wrapper
	//++ Parse hue (degrees 0-360)
	const hue = parseFloat(hueStr)
	if (hue < 0 || hue > 360) {
		return error({
			code: "OKLCH_COLOR_INVALID_HUE",
			field: "oklchColor",
			messages: ["The system needs hue between 0 and 360 degrees."],
			received: value,
			expected: "Hue: 0-360 degrees",
			suggestion: "Use a hue value like 120 (green) or 240 (blue)",
			constraints: { min: 0, max: 360 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] parseFloat, <, >, and || permitted in Toolsmith for performance - provides OklchColor validation wrapper
	//++ Parse optional alpha (0-1)
	if (alphaStr) {
		const alpha = parseFloat(alphaStr)
		if (alpha < 0 || alpha > 1) {
			return error({
				code: "OKLCH_COLOR_INVALID_ALPHA",
				field: "oklchColor",
				messages: ["The system needs alpha between 0 and 1."],
				received: value,
				expected: "Alpha: 0-1",
				suggestion: "Use an alpha value like 0.8 or 0.5",
				constraints: { min: 0, max: 1 },
				severity: "requirement",
			})
		}
	}

	//++ [EXCEPTION] .toLocaleLowerCase() permitted in Toolsmith for performance - provides OklchColor validation wrapper
	const normalized = value.toLocaleLowerCase()
	return ok(unsafeOklchColor(normalized))
}

//++ Export the OklchColor branded type
export type { OklchColor }

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { P3Color } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeP3Color from "@sitebender/toolsmith/newtypes/stringTypes/p3Color/unsafeP3Color/index.ts"

//++ Regex pattern for P3 color: color(display-p3 R G B) or color(display-p3 R G B / A)
const P3_PATTERN =
	/^color\s*\(\s*display-p3\s+([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+%?)\s*(?:\/\s*([0-9.]+))?\s*\)$/i

//++ Smart constructor that validates and creates a P3Color value
//++ Validates Display P3 color format with R/G/B (0-1) and optional alpha (0-1)
export default function p3Color(
	value: string,
): Result<ValidationError, P3Color> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides P3Color validation wrapper
	if (value.length === 0) {
		return error({
			code: "P3_COLOR_EMPTY",
			field: "p3Color",
			messages: ["The system needs a non-empty Display P3 color string."],
			received: value,
			expected:
				"P3 color in color(display-p3 R G B) or color(display-p3 R G B / A) format",
			suggestion:
				"Provide a P3 color like 'color(display-p3 1 0 0)' or 'color(display-p3 100% 50% 0% / 0.8)'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .match() permitted in Toolsmith for performance - provides P3Color validation wrapper
	const match = value.match(P3_PATTERN)
	if (!match) {
		return error({
			code: "P3_COLOR_INVALID_FORMAT",
			field: "p3Color",
			messages: ["The system needs a valid Display P3 color format."],
			received: value,
			expected:
				"color(display-p3 red green blue) or color(display-p3 red green blue / alpha)",
			suggestion:
				"Use format like 'color(display-p3 1 0 0)' or 'color(display-p3 100% 0% 0%)'",
			examples: [
				"color(display-p3 1 0 0)",
				"color(display-p3 100% 50% 0%)",
				"color(display-p3 1 0 0 / 0.8)",
			],
			severity: "requirement",
		})
	}

	const redStr = match[1]
	const greenStr = match[2]
	const blueStr = match[3]
	const alphaStr = match[4]

	//++ [EXCEPTION] .endsWith(), parseFloat, .slice(), /, <, >, and || permitted in Toolsmith for performance - provides P3Color validation wrapper
	//++ Parse red (can be percentage or decimal)
	const red = redStr.endsWith("%")
		? parseFloat(redStr.slice(0, -1)) / 100
		: parseFloat(redStr)

	if (red < 0 || red > 1) {
		return error({
			code: "P3_COLOR_INVALID_RED",
			field: "p3Color",
			messages: [
				"The system needs red channel between 0 and 1 (or 0% and 100%).",
			],
			received: value,
			expected: "Red: 0-1 or 0%-100%",
			suggestion: "Use a red value like 1 or 100%",
			constraints: { min: 0, max: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .endsWith(), parseFloat, .slice(), /, <, >, and || permitted in Toolsmith for performance - provides P3Color validation wrapper
	//++ Parse green (can be percentage or decimal)
	const green = greenStr.endsWith("%")
		? parseFloat(greenStr.slice(0, -1)) / 100
		: parseFloat(greenStr)

	if (green < 0 || green > 1) {
		return error({
			code: "P3_COLOR_INVALID_GREEN",
			field: "p3Color",
			messages: [
				"The system needs green channel between 0 and 1 (or 0% and 100%).",
			],
			received: value,
			expected: "Green: 0-1 or 0%-100%",
			suggestion: "Use a green value like 0.5 or 50%",
			constraints: { min: 0, max: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .endsWith(), parseFloat, .slice(), /, <, >, and || permitted in Toolsmith for performance - provides P3Color validation wrapper
	//++ Parse blue (can be percentage or decimal)
	const blue = blueStr.endsWith("%")
		? parseFloat(blueStr.slice(0, -1)) / 100
		: parseFloat(blueStr)

	if (blue < 0 || blue > 1) {
		return error({
			code: "P3_COLOR_INVALID_BLUE",
			field: "p3Color",
			messages: [
				"The system needs blue channel between 0 and 1 (or 0% and 100%).",
			],
			received: value,
			expected: "Blue: 0-1 or 0%-100%",
			suggestion: "Use a blue value like 0 or 0%",
			constraints: { min: 0, max: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] parseFloat, <, >, and || permitted in Toolsmith for performance - provides P3Color validation wrapper
	//++ Parse optional alpha (0-1)
	if (alphaStr) {
		const alpha = parseFloat(alphaStr)
		if (alpha < 0 || alpha > 1) {
			return error({
				code: "P3_COLOR_INVALID_ALPHA",
				field: "p3Color",
				messages: ["The system needs alpha between 0 and 1."],
				received: value,
				expected: "Alpha: 0-1",
				suggestion: "Use an alpha value like 0.8 or 0.5",
				constraints: { min: 0, max: 1 },
				severity: "requirement",
			})
		}
	}

	//++ [EXCEPTION] .toLocaleLowerCase() permitted in Toolsmith for performance - provides P3Color validation wrapper
	const normalized = value.toLocaleLowerCase()
	return ok(unsafeP3Color(normalized))
}

//++ Export the P3Color branded type
export type { P3Color }

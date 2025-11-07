import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeHexColor from "@sitebender/toolsmith/newtypes/stringTypes/hexColor/unsafeHexColor/index.ts"

//++ Regex pattern for hex color: #RGB or #RRGGBB format
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/

//++ Smart constructor that validates and creates a HexColor value
//++ Validates hex color format (#RGB or #RRGGBB) and normalizes to lowercase
export default function hexColor(
	value: string,
): Result<ValidationError, HexColor> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides HexColor validation wrapper
	if (value.length === 0) {
		return error({
			code: "HEX_COLOR_EMPTY",
			field: "hexColor",
			messages: ["The system needs a non-empty hex color string."],
			received: value,
			expected: "Hex color in #RGB or #RRGGBB format",
			suggestion: "Provide a hex color like '#fff', '#ffffff', or '#abc123'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] !, .test() permitted in Toolsmith for performance - provides HexColor validation wrapper
	if (!HEX_COLOR_PATTERN.test(value)) {
		return error({
			code: "HEX_COLOR_INVALID_FORMAT",
			field: "hexColor",
			messages: ["The system needs a valid hex color format."],
			received: value,
			expected: "Hex color starting with # followed by 3 or 6 hex digits",
			suggestion: "Use format #RGB (e.g., #f00) or #RRGGBB (e.g., #ff0000)",
			examples: ["#fff", "#000", "#abc", "#ff0000", "#00ff00", "#0000ff"],
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .toLocaleLowerCase() permitted in Toolsmith for performance - provides HexColor validation wrapper
	const normalized = value.toLocaleLowerCase()
	return ok(unsafeHexColor(normalized))
}

//++ Export the HexColor branded type
export type { HexColor }

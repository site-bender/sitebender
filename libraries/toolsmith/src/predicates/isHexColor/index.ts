import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Regex pattern for hex color: #RGB or #RRGGBB format
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/

//++ Type predicate that checks if a string is a valid hex color
export default function isHexColor(value: string): value is HexColor {
	//++ [EXCEPTION] typeof, !==, ||, .length, ===, and .test() permitted in Toolsmith for performance - provides hex color validation wrapper
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	return HEX_COLOR_PATTERN.test(value)
}

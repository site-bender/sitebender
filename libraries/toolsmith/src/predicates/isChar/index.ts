import type { Char } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is exactly one Unicode character
export default function isChar(value: string): value is Char {
	//++ [EXCEPTION] typeof, ===, &&, Array.from, and .length permitted in Toolsmith for performance - provides char validation wrapper
	//++ Use Array.from to properly count Unicode code points, not UTF-16 code units
	//++ This handles multi-byte characters like emojis correctly (e.g., "😀" has length 2 but 1 code point)
	return typeof value === "string" && Array.from(value).length === 1
}

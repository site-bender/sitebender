import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is non-empty after trimming
export default function isNonEmptyString(value: string): value is NonEmptyString {
	//++ [EXCEPTION] typeof, ===, &&, .trim(), .length, and > permitted in Toolsmith for performance - provides non-empty string validation wrapper
	return typeof value === "string" && value.trim().length > 0
}

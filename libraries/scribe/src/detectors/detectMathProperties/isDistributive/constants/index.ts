//++ Constants for detecting distributive mathematical properties

export const DISTRIBUTIVE_FUNCTION_NAMES = [
	"multiply",
	"times",
	"product",
	"and",
	"all",
	"intersection",
	"intersect",
	"apply",
	"map",
	"transform",
	"scale",
	"amplify",
] as const

export const FUNCTION_NAME_PATTERNS = [
	/function\s+(\w+)/,
	/const\s+(\w+)\s*=/,
	/export\s+default\s+function\s+(\w+)/,
] as const

export const DISTRIBUTIVE_CODE_PATTERNS = [
	/\*.*\([^)]*\+[^)]*\)/, // a * (b + c)
	/\([^)]*\+[^)]*\).*\*/, // (b + c) * a
	/\.map\(/, // Array map
	/\.forEach\(/, // Array forEach
	/\.filter\(/, // Array filter
	/&&.*\(\|/, // AND over OR
	/\|\|.*\(&/, // OR over AND
	/intersection.*union/i, // Set intersection over union
	/union.*intersection/i, // Set union over intersection
	/scale.*\(/, // Scaling operations
	/multiply.*\+/, // Multiply over add
	/\*.*\+/, // Times over plus
] as const

export const APPLY_OPERATION_PATTERNS = [
	/\*/, // Multiplication
	/&&/, // Logical AND
	/&/, // Bitwise AND
] as const

export const COMBINE_OPERATION_PATTERNS = [
	/\+/, // Addition
	/\|\|/, // Logical OR
	/\|/, // Bitwise OR
] as const

export const COLLECTION_DISTRIBUTIVE_PATTERNS = [
	/concat.*map/, // Map over concatenated collections
	/map.*concat/, // Concat mapped collections
	/filter.*\+/, // Filter with addition
	/\+.*filter/, // Addition with filter
	/reduce.*\*/, // Reduce with multiplication
	/reduce.*\+/, // Reduce with addition
] as const

export const TERNARY_FUNCTION_PATTERN =
	/function\s*\w*\s*\((\w+),\s*(\w+),\s*(\w+)\)/

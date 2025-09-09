//++ Constants for detecting idempotent operations in AST

export const IDEMPOTENT_METHOD_NAMES = [
	"abs",
	"floor",
	"ceil",
	"round",
	"trunc",
	"sign",
	"normalize",
	"trim",
	"toLowerCase",
	"toUpperCase",
	"sort",
	"reverse",
	"unique",
	"distinct",
	"dedupe",
	"flatten",
]

export const IDEMPOTENT_MATH_METHODS = [
	"Math.abs",
	"Math.floor",
	"Math.ceil",
	"Math.round",
	"Math.trunc",
	"Math.sign",
]

export const IDEMPOTENT_FUNCTION_NAMES = [
	"abs",
	"absolute",
	"floor",
	"ceil",
	"round",
	"truncate",
	"trunc",
	"sign",
	"normalize",
	"trim",
	"lowercase",
	"uppercase",
	"capitalize",
	"sort",
	"sorted",
	"unique",
	"distinct",
	"dedupe",
	"deduplicate",
	"flatten",
	"identity",
	"id",
]

export const IDEMPOTENT_PATTERNS = [
	"Math.min(", // min(min(x)) = min(x)
	"Math.max(", // max(max(x)) = max(x)
	"|| false", // idempotent boolean operations
	"&& true",
	"| 0", // idempotent bitwise operations
	"& -1",
]

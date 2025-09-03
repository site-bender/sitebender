// Shared constants for repository scripts

// Alias policy paths
export const ENGINE_SRC = "libraries/engine/src/"
export const ENGINE_TYPES = "libraries/engine/types/"
export const TOOLKIT_SRC = "libraries/toolkit/src/"

export const DEFAULT_ALIAS_SCOPES = [
	"libraries/components/src",
	"docs/src",
	"scripts",
]

// Strict FP defaults
export const DEFAULT_FP_GLOBS = [
	"libraries/*/src/**/*.ts",
	"libraries/*/src/**/*.tsx",
]

export const FP_FORBIDDEN = [
	{ name: "let", regex: /\blet\b/ },
	{ name: "var", regex: /\bvar\b/ },
	{ name: "for-loop", regex: /\bfor\s*\(/ }, // covers for, for..of, for..in
	{ name: "class", regex: /\bclass\s+[A-Za-z0-9_]/ },
	{ name: "inc", regex: /\+\+|--/ },
	{ name: "throw", regex: /\bthrow\b/ },
	// Common array/object mutators
	{ name: "push", regex: /\.push\(/ },
	{ name: "pop", regex: /\.pop\(/ },
	{ name: "shift", regex: /\.shift\(/ },
	{ name: "unshift", regex: /\.unshift\(/ },
	{ name: "splice", regex: /\.splice\(/ },
	{ name: "sort", regex: /\.sort\(/ },
	{ name: "reverse", regex: /\.reverse\(/ },
	{ name: "copyWithin", regex: /\.copyWithin\(/ },
	{ name: "fill", regex: /\.fill\(/ },
]

// Files that are explicitly allowed to violate FP guardrails (stateful adapters, etc.)
export const FP_ALLOWLIST = new Set<string>([
	"libraries/toolkit/src/state/store.ts",
])

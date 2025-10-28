// Shared constants for repository scripts

// Alias policy paths
export const ARCHITECT_SRC = "libraries/artificer/src/"
export const ARCHITECT_TYPES = "libraries/artificer/types/"
export const TOOLSMITH_SRC = "libraries/toolsmith/src/"

export const DEFAULT_ALIAS_SCOPES = [
	"libraries/architect/src",
	"applications/mission-control/src",
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
	"libraries/toolsmith/src/state/store.ts",
	"libraries/artificer/src/reactive/computed.ts",
	"libraries/artificer/src/reactive/signal.ts",
	"libraries/artificer/src/utilities/deterministicId.ts",
])

// No-React-Junk defaults
export const DEFAULT_NO_REACT_GLOBS = [
	"applications/mission-control/src/**/*.ts",
	"applications/mission-control/src/**/*.tsx",
	"libraries/*/src/**/*.ts",
	"libraries/*/src/**/*.tsx",
]

export const NO_REACT_ALLOWLIST = new Set<string>([
	// Our custom renderer is allowed to reference these names for compatibility
	"scripts/build/generatePages/buildRoute/renderPageWithApp/renderToString/index.ts",
])

// Formatting scan defaults
export const FORMAT_ROOTS = [
	"mission-control",
	"the-workshop",
	"libraries",
	"scripts",
]
export const FORMAT_EXCLUDES = [
	"/dist/",
	"/temp/",
	"/assets/",
	"/node_modules/",
	"/coverage/",
]
export const FORMAT_EXTENSIONS = [
	"ts",
	"tsx",
	"js",
	"jsx",
	"json",
	"jsonc",
	"md",
]

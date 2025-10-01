//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

// Property badge labels
export const PROPERTY_BADGES = {
	pure: "Pure",
	curried: "Curried",
	idempotent: "Idempotent",
	commutative: "Commutative",
	associative: "Associative",
	distributive: "Distributive",
	deterministic: "Deterministic",
} as const

// Mathematical law names
export const LAW_NAMES = {
	identity: "Identity",
	commutativity: "Commutativity",
	associativity: "Associativity",
	distributivity: "Distributivity",
	idempotence: "Idempotence",
	involution: "Involution",
	absorption: "Absorption",
} as const

// TypeScript AST node kinds we care about
export const NODE_KINDS = {
	functionDeclaration: "FunctionDeclaration",
	arrowFunction: "ArrowFunction",
	methodDeclaration: "MethodDeclaration",
	variableStatement: "VariableStatement",
	parameter: "Parameter",
	identifier: "Identifier",
	typeReference: "TypeReference",
	returnStatement: "ReturnStatement",
	ifStatement: "IfStatement",
	forStatement: "ForStatement",
	whileStatement: "WhileStatement",
	callExpression: "CallExpression",
} as const

// Side effect indicators
export const SIDE_EFFECT_INDICATORS = [
	"console",
	"localStorage",
	"sessionStorage",
	"document",
	"window",
	"process",
	"Math.random",
	"Date.now",
	"crypto",
	"fetch",
	"XMLHttpRequest",
] as const

// Pure function indicators
export const PURE_INDICATORS = [
	"return",
	"const",
	"=>",
] as const

// Mutation indicators
export const MUTATION_INDICATORS = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
	"fill",
	"copyWithin",
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"++",
	"--",
] as const

// Default generation options
export const DEFAULT_OPTIONS = {
	format: "markdown" as const,
	includeExamples: true,
	includeProperties: true,
	includeBenchmarks: false,
	includeRelated: true,
} as const

// Documentation templates
export const TEMPLATES = {
	markdown: {
		header: "## {name}\n\n{description}\n\n",
		properties: "**Properties:** {badges}\n\n",
		signature: "**Signature:**\n```typescript\n{signature}\n```\n\n",
		examples: "**Examples:**\n```typescript\n{examples}\n```\n\n",
		laws: "**Mathematical Properties:**\n{laws}\n\n",
		complexity: "**Complexity:** {complexity}\n\n",
		related: "**See also:** {related}\n",
	},
	html: {
		header: "<h2>{name}</h2>\n<p>{description}</p>\n",
		properties: '<div class="properties">{badges}</div>\n',
		signature: '<pre class="signature"><code>{signature}</code></pre>\n',
		examples:
			'<div class="examples"><pre><code>{examples}</code></pre></div>\n',
		laws: '<div class="laws">{laws}</div>\n',
		complexity: '<div class="complexity">Complexity: {complexity}</div>\n',
		related: '<div class="related">See also: {related}</div>\n',
	},
} as const

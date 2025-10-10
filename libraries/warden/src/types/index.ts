//++ Core type definitions for Warden
//++ These types define the interfaces and contracts used throughout the system
//++
//++ Note: This is the ONLY file in Warden that re-exports types as named exports.
//++ All other files follow the one-export-per-file rule with default exports.

//++ Configuration for Warden enforcement
export type WardenConfig = {
	// Target directories to enforce (e.g., ["libraries/warden/", "libraries/toolsmith/"])
	readonly targets: ReadonlyArray<string>

	// Enforcement phase: pending (log only), warn (log + exit non-zero), block (fail CI)
	readonly phase: EnforcementPhase

	// Custom privacy rules (optional, defaults to underscore rules)
	readonly privacyRules?: ReadonlyArray<PrivacyRule>

	// Contract paths to validate (optional)
	readonly contractPaths?: ReadonlyArray<string>

	// Performance settings (optional)
	readonly performance?: {
		readonly maxExecutionTime: number // Maximum time in milliseconds (default: 5000)
		readonly parallelProcessing: boolean // Enable concurrent validation (default: true)
	}

	// Reporting configuration (optional)
	readonly reporting?: {
		readonly format: "json" | "markdown" | "console"
		readonly outputPath?: string
	}
}

//++ Enforcement phases: graduated adoption strategy
export type EnforcementPhase = "pending" | "warn" | "block"

//++ Privacy rule definition
export type PrivacyRule = {
	readonly pattern: string
	readonly description: string
	readonly severity: "low" | "medium" | "high"
}

//++ Privacy violation details
export type PrivacyViolation = {
	readonly type: "privacy"
	readonly fromFile: string // File that imports
	readonly toFile: string // Private file being imported
	readonly line?: number
	readonly column?: number
	readonly message: string
	readonly suggestedFix?: string
}

//++ Import information from AST
export type ImportInfo = {
	readonly source: string // File doing the importing
	readonly specifier: string // Import specifier (e.g., "../foo/bar")
	readonly resolved: string // Resolved absolute path
	readonly line: number
	readonly column: number
}

//++ Import graph: map of file -> its imports
export type ImportGraph = ReadonlyMap<string, ReadonlyArray<ImportInfo>>

//++ Validation result
export type ValidationResult = {
	readonly success: boolean
	readonly violations: ReadonlyArray<PrivacyViolation>
	readonly filesChecked: number
	readonly executionTime: number // milliseconds
	readonly phase: EnforcementPhase
}

//++ Contract definition
export type Contract = {
	readonly version: string
	readonly lastUpdated: string
	readonly library: string
	readonly purpose: string
	readonly api: {
		readonly exports: ReadonlyArray<ApiExport>
		readonly types?: ReadonlyArray<TypeDefinition>
	}
	readonly privacy: {
		readonly publicFunctions: ReadonlyArray<string>
		readonly privateFunctions: ReadonlyArray<string>
		readonly enforcement: "strict" | "warn" | "pending"
		readonly rules?: {
			readonly nesting?: string
			readonly noUtils?: string
			readonly noAbbreviations?: string
			readonly lowestCommonAncestor?: string
		}
	}
	readonly implementation?: {
		readonly allowed: ReadonlyArray<string>
		readonly forbidden: ReadonlyArray<string>
	}
}

//++ API export in contract
export type ApiExport = {
	readonly name: string
	readonly signature: string
	readonly description: string
}

//++ Type definition in contract
export type TypeDefinition = {
	readonly name: string
	readonly description: string
	readonly fields: ReadonlyArray<string>
}

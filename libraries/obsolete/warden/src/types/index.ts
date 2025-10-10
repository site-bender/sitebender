//++ Core type definitions for Warden
//++ These types define the interfaces and contracts used throughout the system

//++ Configuration type for Warden enforcement
export type WardenConfig = {
	// Target directories to enforce
	targets: string[]

	// Enforcement phase
	phase: "pending" | "warn" | "block"

	// Custom privacy rules
	privacyRules?: PrivacyRule[]

	// Contract locations
	contractPaths?: string[]

	// Performance settings
	performance?: {
		maxExecutionTime: number
		parallelProcessing: boolean
	}

	// Reporting configuration
	reporting?: {
		format: "json" | "markdown" | "console"
		outputPath?: string
	}
}

//++ Privacy rule type
export type PrivacyRule = {
	pattern: string
	description: string
	severity: "low" | "medium" | "high"
}

//++ Enforcement result type
export type EnforcementResult = {
	success: boolean
	violations: Violation[]
	executionTime: number
	phase: string
}

//++ Violation type
export type Violation = {
	type: "privacy" | "structure" | "import" | "contract"
	severity: "low" | "medium" | "high"
	message: string
	file: string
	line?: number
	column?: number
}

//++ Enforcement phase type
export type EnforcementPhase = "pending" | "warn" | "block"

//++ Validation result type
export type ValidationResult = {
	success: boolean
	errors: string[]
	warnings: string[]
}

// Re-export enforcement types
export type {
	Boundaries,
	ContractMetadata,
	ContractOutput,
	ContractViolation,
	EnforcementConfig,
} from "./enforcement.ts"

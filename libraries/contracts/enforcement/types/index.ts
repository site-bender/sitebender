//++ Core types for the contract enforcement system

//++ Metadata about a contract including version, timestamps, and checksums
export type ContractMetadata = {
	readonly library: string
	readonly version: string
	readonly timestamp: number
	readonly checksum: string
	readonly hashAlgo?: "sha256" | "blake3"
	readonly hashVersion?: number
	readonly hash?: string
	readonly frozen: boolean
}

//++ Immutable contract output wrapper with data, metadata, and validation
export type ContractOutput<T> = {
	readonly data: T
	readonly metadata: ContractMetadata
	readonly validate: () => Promise<boolean>
}

//++ Result of validating an import or contract with errors and warnings
export type ValidationResult = {
	readonly valid: boolean
	readonly errors: ReadonlyArray<string>
	readonly warnings: ReadonlyArray<string>
}

//++ Represents a detected contract violation with location and severity
export type ContractViolation = {
	readonly type: "import" | "mutation" | "boundary" | "api"
	readonly library: string
	readonly description: string
	readonly file?: string
	readonly line?: number
	readonly severity: "error" | "warning"
}

//++ Configuration options for contract enforcement behavior
export type EnforcementConfig = {
	readonly strict: boolean
	readonly throwOnViolation: boolean
	readonly logViolations: boolean
	readonly checksumAlgorithm: "sha256" | "sha512"
}

//++ Library dependency boundaries configuration
export type Boundaries = {
	readonly dependencies: Record<
		string,
		{
			readonly canImport: ReadonlyArray<string>
			readonly forbiddenImports: ReadonlyArray<string>
		}
	>
}

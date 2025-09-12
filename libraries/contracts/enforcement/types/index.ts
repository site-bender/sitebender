//++ Core types for the contract enforcement system

export type ContractMetadata = {
	readonly library: string
	readonly version: string
	readonly timestamp: number
	readonly checksum: string
	readonly frozen: boolean
}

export type ContractOutput<T> = {
	readonly data: T
	readonly metadata: ContractMetadata
	readonly validate: () => boolean
}

export type ValidationResult = {
	readonly valid: boolean
	readonly errors: ReadonlyArray<string>
	readonly warnings: ReadonlyArray<string>
}

export type ContractViolation = {
	readonly type: "import" | "mutation" | "boundary" | "api"
	readonly library: string
	readonly description: string
	readonly file?: string
	readonly line?: number
	readonly severity: "error" | "warning"
}

export type EnforcementConfig = {
	readonly strict: boolean
	readonly throwOnViolation: boolean
	readonly logViolations: boolean
	readonly checksumAlgorithm: "sha256" | "sha512"
}

import type Logger from "./Logger/index.ts"

export type GeneratorConfig = {
	maxPropertyRuns: number
	includeEdgeCases: boolean
	includePropertyTests: boolean
	includeBenchmarks: boolean
	targetCoverage: number
	logger?: Logger
}

export type TestFileMetadata = {
	sourceFile: string
	testFile: string
	generatedAt: string
	generator: string
	version: string
}

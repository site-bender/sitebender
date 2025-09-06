export interface ValidationResult {
	valid: boolean
	violations: Array<string>
	stats: {
		totalFiles: number
		functionsFound: number
		classesFound: number
		correctStructure: number
	}
}
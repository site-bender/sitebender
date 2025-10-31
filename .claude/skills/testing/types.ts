//++ Type definitions for test generator configuration

export type TestCase = {
	readonly description: string // Test case description
	readonly input: string // Input expression (e.g., "42", "[1, 2, 3]")
	readonly expected: string // Expected output expression
}

export type TestConfig = {
	readonly functionName: string // Name of function being tested
	readonly functionPath: string // Import path to function
	readonly testCases?: ReadonlyArray<TestCase> // Manual test cases to generate
	readonly includePropertyTests?: boolean // Generate property-based test templates
	readonly includeErrorTests?: boolean // Generate error path tests (for Result/Validation)
	readonly description?: string // Description of what's being tested
}

export type GeneratorOptions = {
	readonly outputPath?: string // Where to write test file
	readonly keepConfig?: boolean // Keep config file after generation
}

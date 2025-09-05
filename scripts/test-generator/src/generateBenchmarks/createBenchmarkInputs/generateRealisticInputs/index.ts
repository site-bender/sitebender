/**
 * Generate realistic inputs based on common usage patterns
 */

/**
 * Generate realistic inputs that mirror real-world usage
 * @param inputType Type of input to generate
 * @param patterns Detected benchmark patterns for context
 * @returns Array of realistic inputs
 */
export default function generateRealisticInputs(
	inputType: string,
	patterns: Array<string>
): Array<unknown> {
	const inputs: Array<unknown> = []
	
	switch (inputType) {
		case 'array':
			// Common array scenarios
			inputs.push(
				[1, 2, 3, 4, 5],                          // Small sequential
				Array.from({ length: 100 }, (_, i) => i), // Medium sequential
				[1, 1, 2, 3, 5, 8, 13, 21],              // Fibonacci sequence
				[-5, -1, 0, 3, 7, 12, 18],               // Mixed positive/negative
				[],                                        // Empty array
				[42],                                      // Single element
				Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100)) // Random data
			)
			break
			
		case 'string':
			inputs.push(
				'hello world',                             // Simple phrase
				'The quick brown fox jumps over the lazy dog', // Common test string
				'a'.repeat(1000),                         // Long uniform string
				'Hello, 世界! 🌍',                        // Unicode/emoji
				'',                                        // Empty string
				'CamelCaseString',                        // Programming convention
				'snake_case_string',                      // Programming convention
				'kebab-case-string',                      // Programming convention
				JSON.stringify({ name: 'test', value: 42 }) // JSON-like data
			)
			break
			
		case 'number':
			inputs.push(
				0,                                         // Zero
				1,                                         // Identity
				-1,                                        // Negative
				42,                                        // Classic test number
				Math.PI,                                   // Irrational
				Number.MAX_SAFE_INTEGER,                   // Large integer
				Number.MIN_SAFE_INTEGER,                   // Large negative
				0.123456789,                              // Decimal
				1e6,                                       // Scientific notation
				Infinity                                   // Edge case
			)
			break
			
		case 'object':
			inputs.push(
				{ name: 'John', age: 30, city: 'New York' }, // Simple user object
				{ id: 1, items: [1, 2, 3], meta: { created: Date.now() } }, // Nested object
				{},                                         // Empty object
				Object.fromEntries(                        // Large flat object
					Array.from({ length: 100 }, (_, i) => [`key${i}`, i])
				),
				{ a: { b: { c: { d: 'deep' } } } },        // Deeply nested
				Array.from({ length: 10 }, (_, i) => ({ id: i, value: i * 2 })) // Array of objects
			)
			break
			
		default:
			// Mixed realistic values
			inputs.push(
				null,
				undefined,
				true,
				false,
				0,
				1,
				'test',
				[],
				{}
			)
	}
	
	// Pattern-specific realistic inputs
	if (patterns.includes('math-operation')) {
		inputs.push(...generateMathRealistic())
	}
	
	if (patterns.includes('string-operation')) {
		inputs.push(...generateStringRealistic())
	}
	
	if (patterns.includes('array-operation')) {
		inputs.push(...generateArrayRealistic())
	}
	
	return inputs
}

/**
 * Generate realistic inputs for mathematical operations
 */
function generateMathRealistic(): Array<number> {
	return [
		0, 1, -1, 2, 10, 100, 1000,          // Common numbers
		Math.PI, Math.E,                      // Mathematical constants
		0.5, 0.1, 0.01,                      // Common fractions
		42, 69, 420,                         // Meme numbers (realistic test data)
		Number.MAX_SAFE_INTEGER / 2          // Large but safe number
	]
}

/**
 * Generate realistic inputs for string operations
 */
function generateStringRealistic(): Array<string> {
	return [
		'firstName',                          // camelCase
		'first_name',                        // snake_case
		'first-name',                        // kebab-case
		'CONSTANT_VALUE',                    // SCREAMING_SNAKE_CASE
		'hello@example.com',                 // Email format
		'https://example.com/path?param=value', // URL format
		'/api/v1/users/123',                 // API path
		'2023-12-25T10:30:00Z',             // ISO date
		'Lorem ipsum dolor sit amet',        // Latin text
		'🎉 Hello, 世界! 🌍'                  // Unicode/emoji mix
	]
}

/**
 * Generate realistic inputs for array operations
 */
function generateArrayRealistic(): Array<Array<unknown>> {
	return [
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],    // Sequential numbers
		['apple', 'banana', 'cherry'],       // String list
		[true, false, true, false],          // Boolean list
		[null, undefined, 0, '', false],     // Falsy values
		[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], // Object list
		[[1, 2], [3, 4], [5, 6]],           // Nested arrays
		Array.from({ length: 10 }, () => Math.random()), // Random data
		[...Array(100).keys()],             // Large sequential
	]
}
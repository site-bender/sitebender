import type { ParseError, Result, Token, TokenType } from "../types/index.ts"

import { TOKEN_PATTERNS } from "../constants/index.ts"

/**
 * Tokenizes a mathematical expression into a sequence of tokens.
 * Performs lexical analysis to convert string input into structured tokens.
 *
 * @param input - Mathematical expression string to tokenize
 * @returns Result containing array of tokens or parse error
 *
 * @example
 * ```typescript
 * // Example 1: Tokenize simple addition
 * const result = tokenize("a + b")
 * // Returns: { ok: true, value: [
 * //   { type: "IDENTIFIER", value: "a", position: 0 },
 * //   { type: "PLUS", value: "+", position: 2 },
 * //   { type: "IDENTIFIER", value: "b", position: 4 },
 * //   { type: "EOF", value: "", position: 5 }
 * // ]}
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Tokenize numbers and operators
 * const result = tokenize("3.14 * 2")
 * // Returns: { ok: true, value: [
 * //   { type: "NUMBER", value: "3.14", position: 0 },
 * //   { type: "MULTIPLY", value: "*", position: 5 },
 * //   { type: "NUMBER", value: "2", position: 7 },
 * //   { type: "EOF", value: "", position: 8 }
 * // ]}
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Handle parentheses
 * const result = tokenize("(x + y)")
 * // Returns tokens including LEFT_PAREN and RIGHT_PAREN
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Error on invalid characters
 * const result = tokenize("a & b")
 * // Returns: { ok: false, error: { message: "Unexpected character '&' at position 2", position: 2 } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Complex expression with all token types
 * const result = tokenize("(a + b) * c^2 - d/e")
 * // Returns complete token sequence preserving position information
 * ```
 */
export default function tokenize(
	input: string,
): Result<Array<Token>, ParseError> {
	const tokens: Array<Token> = []
	let position = 0

	while (position < input.length) {
		// Skip whitespace
		const whitespaceMatch = TOKEN_PATTERNS.WHITESPACE.exec(
			input.slice(position),
		)
		if (whitespaceMatch) {
			position += whitespaceMatch[0].length
			continue
		}

		// Check for numbers
		const numberMatch = TOKEN_PATTERNS.NUMBER.exec(input.slice(position))
		if (numberMatch) {
			// Check for invalid number formats like "3.14.159"
			const afterNumber = input.slice(position + numberMatch[0].length)
			if (afterNumber.startsWith(".") && /^\.\d/.test(afterNumber)) {
				return {
					ok: false,
					error: {
						message: `Invalid number format at position ${position}: ${
							numberMatch[0] + afterNumber.slice(0, 4)
						}`,
						position,
					},
				}
			}

			tokens.push({
				type: "NUMBER",
				value: numberMatch[0],
				position,
			})
			position += numberMatch[0].length
			continue
		}

		// Check for identifiers (variables)
		const identifierMatch = TOKEN_PATTERNS.IDENTIFIER.exec(
			input.slice(position),
		)
		if (identifierMatch) {
			tokens.push({
				type: "IDENTIFIER",
				value: identifierMatch[0],
				position,
			})
			position += identifierMatch[0].length
			continue
		}

		// Check for single-character operators and parentheses
		const char = input[position]
		let tokenType: TokenType | null = null

		switch (char) {
			case "+":
				tokenType = "PLUS"
				break
			case "-":
				tokenType = "MINUS"
				break
			case "*":
				tokenType = "MULTIPLY"
				break
			case "/":
				tokenType = "DIVIDE"
				break
			case "^":
				tokenType = "POWER"
				break
			case "(":
				tokenType = "LEFT_PAREN"
				break
			case ")":
				tokenType = "RIGHT_PAREN"
				break
			default:
				return {
					ok: false,
					error: {
						message: `Unexpected character '${char}' at position ${position}`,
						position,
						found: char,
					},
				}
		}

		tokens.push({
			type: tokenType,
			value: char,
			position,
		})
		position++
	}

	// Add EOF token
	tokens.push({
		type: "EOF",
		value: "",
		position,
	})

	return { ok: true, value: tokens }
}

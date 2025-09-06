import type { ParseError, Result, Token } from "../types/index.ts"
import tokenizeRecursive from "./tokenizeRecursive/index.ts"

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
	return tokenizeRecursive(input, 0, [])
}

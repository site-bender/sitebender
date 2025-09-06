import type { Token } from "../../../types/index.ts"
import type { ParserContext } from "../../parseExpression/index.ts"

/**
 * Creates a parser context with token navigation functions.
 * Encapsulates the state and navigation logic for the parser.
 *
 * @param tokens - Array of tokens to parse
 * @returns Parser context with current, advance functions
 *
 * @example
 * ```typescript
 * // Example 1: Create context for simple expression
 * const tokens = [
 *   { type: "IDENTIFIER", value: "a", position: 0 },
 *   { type: "PLUS", value: "+", position: 2 },
 *   { type: "IDENTIFIER", value: "b", position: 4 },
 *   { type: "EOF", value: "", position: 5 }
 * ]
 * const ctx = createParserContext(tokens)
 * ctx.current() // Returns: { type: "IDENTIFIER", value: "a", position: 0 }
 * ctx.advance() // Returns: { type: "IDENTIFIER", value: "a", position: 0 }
 * ctx.current() // Returns: { type: "PLUS", value: "+", position: 2 }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Advance through all tokens
 * const tokens = tokenize("x + y")
 * const ctx = createParserContext(tokens.value)
 * const collected = []
 * while (ctx.current().type !== "EOF") {
 *   collected.push(ctx.advance().value)
 * }
 * // collected: ["x", "+", "y"]
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: EOF handling - stays at EOF
 * const tokens = [
 *   { type: "NUMBER", value: "42", position: 0 },
 *   { type: "EOF", value: "", position: 2 }
 * ]
 * const ctx = createParserContext(tokens)
 * ctx.advance() // Returns NUMBER
 * ctx.advance() // Returns EOF
 * ctx.advance() // Returns EOF (stays at EOF)
 * ctx.current() // Returns EOF
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Empty token array handling
 * const ctx = createParserContext([])
 * ctx.current() // Returns undefined or throws depending on implementation
 * // Note: In practice, tokenizer always adds EOF token
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Use in parsing pipeline
 * const tokens = tokenize("(a + b) * c")
 * const ctx = createParserContext(tokens.value)
 * const result = parseExpression(ctx)(0)
 * // Context manages position internally as parsing progresses
 * ```
 */
export default function createParserContext(
	tokens: Array<Token>,
): ParserContext {
	let position = 0

	const current = (): Token => tokens[position] || tokens[tokens.length - 1]

	const advance = (): Token => {
		const token = current()
		if (token.type !== "EOF") {
			position++
		}
		return token
	}

	return {
		tokens,
		position,
		current,
		advance,
	}
}

import type { Token } from "../../../types/index.ts"
import type { ParserContext } from "../../parseExpression/index.ts"

//++ Creates a stateful parser context that manages token navigation with advance/current methods
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

/*??
 | [EXAMPLE]
 | const tokens = [
 |   { type: "IDENTIFIER", value: "a", position: 0 },
 |   { type: "PLUS", value: "+", position: 2 },
 |   { type: "EOF", value: "", position: 4 }
 | ]
 | const ctx = createParserContext(tokens)
 | ctx.current() // { type: "IDENTIFIER", value: "a", position: 0 }
 | ctx.advance() // Returns "a" token and moves to "+"
 | ctx.current() // { type: "PLUS", value: "+", position: 2 }
 |
 | [EXAMPLE]
 | // EOF handling - stays at EOF
 | const ctx = createParserContext([{ type: "EOF", value: "", position: 0 }])
 | ctx.advance() // Returns EOF
 | ctx.advance() // Still returns EOF (doesn't advance past EOF)
 |
 | [SETUP]
 | Always expects a token array with EOF as the last token.
 | The tokenizer guarantees this, so empty arrays shouldn't occur in practice.
 |
 | [GOTCHA]
 | The advance() method returns the CURRENT token before advancing,
 | not the next token. This is a consume-and-return pattern.
 |
 | [PRO]
 | Encapsulates mutable state safely - position is private to the closure.
 |
 | [PRO]
 | EOF-sticky behavior prevents out-of-bounds access without extra checks.
 |
*/

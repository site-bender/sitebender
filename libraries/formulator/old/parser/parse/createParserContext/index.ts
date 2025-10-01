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

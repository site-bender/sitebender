import type { ASTNode, Result, Token } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"

//+ Parses an identifier token into a Variable AST node
export default function parseVariable(
	token: Token,
	ctx: ParserContext
): Result<ASTNode, never> {
	ctx.advance()
	return {
		ok: true,
		value: {
			type: "Variable",
			name: token.value,
		},
	}
}
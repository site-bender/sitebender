import type { Token } from "../../types/index.ts"

//+ Parser context for tracking position and providing token access
export type ParserContext = {
	tokens: Array<Token>
	position: number
	current: () => Token
	advance: () => Token
}

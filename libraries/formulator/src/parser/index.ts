import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

import tokenizer from "../tokenizer/index.ts"

import type { AstNode } from "./types/index.ts"
import parseExpression from "./parseExpression/index.ts"

//++ Parses a mathematical formula string into an Abstract Syntax Tree
export default function parser(input: string): Result<string, AstNode> {
	const tokens = Array.from(tokenizer(input))

	const result = parseExpression(tokens)(0, 0)

	if (result._tag === "Error") {
		return result
	}

	const [ast, consumedPosition] = result.value

	if (isEqual(length(tokens))(consumedPosition)) {
		return { _tag: "Ok", value: ast }
	}

	return error(
		`Unexpected token at position ${consumedPosition}, expected end of input`,
	)
}

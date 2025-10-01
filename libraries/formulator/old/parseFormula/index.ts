import type {
	ComparatorConfig,
	InjectorConfig,
	OperatorConfig,
} from "../../../architect/types/index.ts"
import type { ParseError, Result, VariableMap } from "../types/index.ts"

import compile from "../compiler/index.ts"
import parse from "../parser/index.ts"
import tokenize from "../tokenizer/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseFormula(
	formula: string,
	variables: VariableMap = {},
): Result<OperatorConfig | InjectorConfig | ComparatorConfig, ParseError> {
	// Step 1: Tokenize the formula
	const tokenResult = tokenize(formula)
	if (!tokenResult.ok) {
		return tokenResult
	}

	// Step 2: Parse tokens into AST
	const parseResult = parse(tokenResult.value)
	if (!parseResult.ok) {
		return parseResult
	}

	// Step 3: Compile AST into architect configuration
	const compileResult = compile(parseResult.value, variables)
	if (!compileResult.ok) {
		return compileResult
	}

	return compileResult
}

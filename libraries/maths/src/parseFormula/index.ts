import type {
	ComparatorConfig,
	InjectorConfig,
	OperatorConfig,
} from "../../../engine/types/index.ts"
import type { ParseError, Result, VariableMap } from "../types/index.ts"

import compile from "../compiler/index.ts"
import parse from "../parser/index.ts"
import tokenize from "../tokenizer/index.ts"

/**
 * Parses a mathematical formula string and generates an engine configuration
 * using the provided variable mappings.
 *
 * @param formula - The mathematical expression to parse (e.g., "(a + b) * c")
 * @param variables - Map of variable names to injector configurations
 * @returns A Result containing either the engine configuration or a parse error
 *
 * @example
 * ```typescript
 * const result = parseFormula("a + b", {
 *   a: { tag: "Constant", type: "injector", datatype: "Number", value: 5 },
 *   b: { tag: "FromElement", type: "injector", datatype: "Number", source: "#input" }
 * })
 *
 * if (result.ok) {
 *   // result.value contains the engine configuration
 *   console.log(result.value) // { tag: "Add", type: "operator", ... }
 * }
 * ```
 */
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

	// Step 3: Compile AST into engine configuration
	const compileResult = compile(parseResult.value, variables)
	if (!compileResult.ok) {
		return compileResult
	}

	return compileResult
}

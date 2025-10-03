import type { CompiledFormula } from "./types/index.ts"

import parser from "../parser/index.ts"
import enrichAstNode from "./enrichAst/index.ts"
import collectMetadata from "./collectMetadata/index.ts"

//++ Compiles a formula string to enriched AST with metadata
export default function compiler(formula: string): CompiledFormula {
	const parseResult = parser(formula)

	if (parseResult._tag === "Error") {
		throw new Error(`Parse error: ${parseResult.error}`)
	}

	const ast = parseResult.value
	const enrichedAst = enrichAstNode(ast)
	const metadata = collectMetadata(enrichedAst, formula)

	return Object.freeze({
		_tag: "compiledFormula",
		ast: enrichedAst,
		metadata,
		sourceFormula: formula,
	})
}

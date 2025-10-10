// @sitebender/arborist/src/parsers/denoAst/parseFile
// Semantic parsing using deno_ast WASM

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/architect/errors/createError/index.ts"
import withSuggestion from "@sitebender/architect/errors/withSuggestion/index.ts"
import { initWasm, parseWithSemantics } from "./wasm/index.ts"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ParseError } from "../../types/index.ts"
import type { SemanticAst } from "../../types/semantics/index.ts"

//++ Initialize WASM module
async function ensureWasmInitialized(wasmPath: string) {
	await initWasm()(wasmPath)
}

//++ Parse file with full semantic analysis using deno_ast WASM
export default async function parseFileWithSemantics(
	filePath: string,
): Promise<Result<ParseError, SemanticAst>> {
	try {
		// Ensure WASM is initialized
		await ensureWasmInitialized(
			"./libraries/arborist/src/parsers/denoAst/wasm/pkg/arborist_deno_ast_wasm_bg.wasm",
		)

		// Read the source file
		const sourceText = await Deno.readTextFile(filePath)

		// Parse with WASM
		const wasmResult = await parseWithSemantics(sourceText, filePath)

		return ok(wasmResult)
	} catch (err) {
		const _message = err instanceof Error ? err.message : String(err)

		const baseError = createError("parseFile")([filePath] as [string])(
			`parseFileWithSemantics: Failed to parse "${filePath}" with semantic analysis`,
		)("OPERATION_FAILED")

		const enrichedError = withSuggestion(
			`Ensure the file contains valid TypeScript syntax and WASM module is properly built.`,
		)(baseError)

		const parseError: ParseError = {
			...enrichedError,
			kind: "InvalidSyntax" as const,
			file: filePath,
		}

		return error(parseError)
	}
}

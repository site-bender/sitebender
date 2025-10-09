// @sitebender/arborist/src/api/buildSemanticFile
// Build complete parsed file with semantic information

import { parse } from "npm:@swc/wasm-web@1.13.20"
import _ensureSwcInitialized from "../../parseFile/_ensureSwcInitialized/index.ts"
import buildParsedFile from "../../buildParsedFile/index.ts"
import map from "@sitebender/toolsmith/monads/validation/map/index.ts"

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type {
	ExtractionError,
	ParsedAst,
	ParsedFile,
} from "../../types/index.ts"
import type { SemanticAst, SemanticFile } from "../../types/semantics/index.ts"

//++ Build parsed file with semantic information from semantic AST
export default function buildSemanticFile(semanticAst: SemanticAst) {
	return async function withFilePath(
		filePath: string,
	): Promise<Validation<ExtractionError, SemanticFile>> {
		// Ensure SWC is initialized
		await _ensureSwcInitialized()

		// Parse the source text with SWC to get ParsedAst (for extraction)
		const module = await parse(semanticAst.sourceText, {
			syntax: "typescript",
			tsx: filePath.endsWith(".tsx"),
			decorators: false,
			dynamicImport: true,
		})

		const parsedAst: ParsedAst = {
			module,
			sourceText: semanticAst.sourceText,
			filePath,
		}

		// Build ParsedFile from SWC AST
		const parsedFileV = buildParsedFile(parsedAst)(filePath)

		// Add semantic information
		return map(function addSemanticInfo(parsedFile: ParsedFile): SemanticFile {
			return {
				...parsedFile,
				semanticInfo: semanticAst.semanticInfo,
			}
		})(parsedFileV)
	}
}

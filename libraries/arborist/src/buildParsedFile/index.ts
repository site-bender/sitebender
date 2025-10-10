// @sitebender/arborist/src/buildParsedFile
// Builds a ParsedFile from SWC AST using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import map2 from "@sitebender/toolsmith/monads/validation/map2/index.ts"
import map3 from "@sitebender/toolsmith/monads/validation/map3/index.ts"
import map4 from "@sitebender/toolsmith/monads/validation/map4/index.ts"

import type {
	ParsedAst,
	ParsedComment,
	ParsedConstant,
	ParsedExport,
	ParsedFile,
	ParsedFunction,
	ParsedImport,
	ParsedType,
	ViolationInfo,
} from "../types/index.ts"
import type { ExtractionError } from "../types/errors/index.ts"
import detectViolations from "../detectViolations/index.ts"
import extractComments from "../extractComments/index.ts"
import extractConstants from "../extractConstants/index.ts"
import extractExports from "../extractExports/index.ts"
import extractFunctions from "../extractFunctions/index.ts"
import extractImports from "../extractImports/index.ts"
import extractTypes from "../extractTypes/index.ts"

import _combineGroup1 from "./_combineGroup1/index.ts"
import _combineGroup2 from "./_combineGroup2/index.ts"
import _combineAll from "./_combineAll/index.ts"

//++ Builds a ParsedFile from SWC AST
//++ Returns Validation to accumulate extraction errors from all features
//++ Extracts: functions, imports, exports, comments, types, constants, violations
//++ This is a curried function: (ast) => (filePath) => Validation<ExtractionError, ParsedFile>
export default function buildParsedFile(ast: ParsedAst) {
	return function buildFromAst(
		filePath: string,
	): Validation<ExtractionError, ParsedFile> {
		// Extract all features from the AST
		const functionsV = extractFunctions(ast)
		const importsV = extractImports(ast)
		const exportsV = extractExports(ast)
		const commentsV = extractComments(ast)
		const typesV = extractTypes(ast)
		const constantsV = extractConstants(ast)
		const violationsV = detectViolations(ast)

		// Combine validations in groups using map2, map3, map4
		// First group: functions, imports, exports, comments (map4)
		const group1V = map4<
			ReadonlyArray<ParsedFunction>,
			ReadonlyArray<ParsedImport>,
			ReadonlyArray<ParsedExport>,
			ReadonlyArray<ParsedComment>,
			{
				functions: ReadonlyArray<ParsedFunction>
				imports: ReadonlyArray<ParsedImport>
				exports: ReadonlyArray<ParsedExport>
				comments: ReadonlyArray<ParsedComment>
			},
			ExtractionError
		>(_combineGroup1)(functionsV)(importsV)(exportsV)(commentsV)

		// Second group: types, constants, violations (map3)
		const group2V = map3<
			ReadonlyArray<ParsedType>,
			ReadonlyArray<ParsedConstant>,
			ViolationInfo,
			{
				types: ReadonlyArray<ParsedType>
				constants: ReadonlyArray<ParsedConstant>
				violations: ViolationInfo
			},
			ExtractionError
		>(_combineGroup2)(typesV)(constantsV)(violationsV)

		// Combine both groups (map2)
		return map2<
			{
				functions: ReadonlyArray<ParsedFunction>
				imports: ReadonlyArray<ParsedImport>
				exports: ReadonlyArray<ParsedExport>
				comments: ReadonlyArray<ParsedComment>
			},
			{
				types: ReadonlyArray<ParsedType>
				constants: ReadonlyArray<ParsedConstant>
				violations: ViolationInfo
			},
			ParsedFile,
			ExtractionError
		>(_combineAll(filePath))(group1V)(group2V)
	}
}

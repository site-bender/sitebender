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
		>(
			function combineGroup1(functions: ReadonlyArray<ParsedFunction>) {
				return function withImports(imports: ReadonlyArray<ParsedImport>) {
					return function withExports(exports: ReadonlyArray<ParsedExport>) {
						return function withComments(
							comments: ReadonlyArray<ParsedComment>,
						) {
							return { functions, imports, exports, comments }
						}
					}
				}
			},
		)(functionsV)(importsV)(exportsV)(commentsV)

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
		>(
			function combineGroup2(types: ReadonlyArray<ParsedType>) {
				return function withConstants(
					constants: ReadonlyArray<ParsedConstant>,
				) {
					return function withViolations(violations: ViolationInfo) {
						return { types, constants, violations }
					}
				}
			},
		)(typesV)(constantsV)(violationsV)

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
		>(
			function combineAll(group1: {
				functions: ReadonlyArray<ParsedFunction>
				imports: ReadonlyArray<ParsedImport>
				exports: ReadonlyArray<ParsedExport>
				comments: ReadonlyArray<ParsedComment>
			}) {
				return function withGroup2(group2: {
					types: ReadonlyArray<ParsedType>
					constants: ReadonlyArray<ParsedConstant>
					violations: ViolationInfo
				}): ParsedFile {
					return {
						filePath,
						...group1,
						...group2,
					}
				}
			},
		)(group1V)(group2V)
	}
}

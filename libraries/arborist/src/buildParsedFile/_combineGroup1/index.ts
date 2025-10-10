//++ Combines functions, imports, exports, and comments into a group object
import type { ParsedFunction, ParsedImport, ParsedExport, ParsedComment } from "../../types/index.ts"

export default function _combineGroup1(functions: ReadonlyArray<ParsedFunction>) {
	return function withImports(imports: ReadonlyArray<ParsedImport>) {
		return function withExports(exports: ReadonlyArray<ParsedExport>) {
			return function withComments(
				comments: ReadonlyArray<ParsedComment>,
			) {
				return { functions, imports, exports, comments }
			}
		}
	}
}

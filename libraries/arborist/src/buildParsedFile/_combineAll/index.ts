//++ Combines group1 and group2 into a final ParsedFile object
import type {
	ParsedFile,
	ParsedFunction,
	ParsedImport,
	ParsedExport,
	ParsedComment,
	ParsedType,
	ParsedConstant,
	ViolationInfo,
} from "../../types/index.ts"

export default function _combineAll(filePath: string) {
	return function withGroup1(group1: {
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
	}
}

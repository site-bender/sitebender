//++ Combines types, constants, and violations into a group object
import type { ParsedType, ParsedConstant, ViolationInfo } from "../../types/index.ts"

export default function _combineGroup2(types: ReadonlyArray<ParsedType>) {
	return function withConstants(
		constants: ReadonlyArray<ParsedConstant>,
	) {
		return function withViolations(violations: ViolationInfo) {
			return { types, constants, violations }
		}
	}
}

import test from "../../../../../../toolsmith/src/vanilla/string/test/index.ts"
import {
	APPLY_OPERATION_PATTERNS,
	COMBINE_OPERATION_PATTERNS,
	TERNARY_FUNCTION_PATTERN,
} from "../constants/index.ts"
import hasAnyPattern from "../hasAnyPattern/index.ts"

//++ Checks if source has a ternary function with distributive operations
export default function hasTernaryDistributivePattern(source: string): boolean {
	const hasTernaryFunction = test(TERNARY_FUNCTION_PATTERN)(source)

	if (!hasTernaryFunction) {
		return false
	}

	const hasApplyOp = hasAnyPattern(APPLY_OPERATION_PATTERNS)(source)
	const hasCombineOp = hasAnyPattern(COMBINE_OPERATION_PATTERNS)(source)

	return hasApplyOp && hasCombineOp
}

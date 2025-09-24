import test from "../../../../../../toolsmith/src/vanilla/string/test/index.ts"
import {
	ASSOCIATIVE_OPERATIONS,
	BINARY_FUNCTION_PATTERN,
	REDUCE_PATTERNS,
} from "../constants/index.ts"
import hasAnyPattern from "../hasAnyPattern/index.ts"

//++ Checks if source has a binary function with associative operations
export default function hasBinaryAssociativePattern(source: string): boolean {
	const hasBinaryFunction = test(BINARY_FUNCTION_PATTERN)(source)

	if (!hasBinaryFunction) {
		return false
	}

	const hasAssociativeOp = hasAnyPattern(ASSOCIATIVE_OPERATIONS)(source)
	const hasReducePattern = hasAnyPattern(REDUCE_PATTERNS)(source)

	return hasAssociativeOp || hasReducePattern
}

//?? [EXAMPLE] hasBinaryAssociativePattern("function f(a, b) { return a + b }") // true
//?? [EXAMPLE] hasBinaryAssociativePattern("function f(a, b) { return acc * b }") // true
//?? [EXAMPLE] hasBinaryAssociativePattern("function f(x) { return x }") // false (not binary)

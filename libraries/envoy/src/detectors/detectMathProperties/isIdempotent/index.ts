import { IDEMPOTENT_OPERATION_PATTERNS } from "./constants/index.ts"
import containsIdempotentCode from "./containsIdempotentCode/index.ts"
import extractFunctionName from "./extractFunctionName/index.ts"
import hasAnyPattern from "./hasAnyPattern/index.ts"
import isIdempotentName from "./isIdempotentName/index.ts"

//++ Detects if a function is idempotent (f(f(x)) = f(x))
export default function isIdempotent(source: string): boolean {
	const functionName = extractFunctionName(source)

	return (
		containsIdempotentCode(source) ||
		isIdempotentName(functionName) ||
		hasAnyPattern(IDEMPOTENT_OPERATION_PATTERNS)(source)
	)
}

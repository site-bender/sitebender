import extractFunctionName from "./extractFunctionName/index.ts"
import isDistributiveName from "./isDistributiveName/index.ts"
import containsDistributiveName from "./containsDistributiveName/index.ts"
import hasAnyPattern from "./hasAnyPattern/index.ts"
import hasTernaryDistributivePattern from "./hasTernaryDistributivePattern/index.ts"
import {
	DISTRIBUTIVE_CODE_PATTERNS,
	COLLECTION_DISTRIBUTIVE_PATTERNS,
} from "./constants/index.ts"

//++ Detects if a function is distributive (f(a, g(b,c)) = g(f(a,b), f(a,c)))
export default function isDistributive(source: string): boolean {
	const functionName = extractFunctionName(source)
	
	return (
		isDistributiveName(functionName) ||
		containsDistributiveName(source) ||
		hasAnyPattern(DISTRIBUTIVE_CODE_PATTERNS)(source) ||
		hasTernaryDistributivePattern(source) ||
		hasAnyPattern(COLLECTION_DISTRIBUTIVE_PATTERNS)(source)
	)
}

//?? [EXAMPLE] isDistributive("function multiply(a, b) { return a * b }") // true
//?? [EXAMPLE] isDistributive("const scale = (factor) => (value) => factor * value") // true
//?? [EXAMPLE] isDistributive("function identity(x) { return x }") // false

import { COLLECTION_ASSOCIATIVE_PATTERNS } from "./constants/index.ts"
import containsAssociativeCode from "./containsAssociativeCode/index.ts"
import extractFunctionName from "./extractFunctionName/index.ts"
import hasAnyPattern from "./hasAnyPattern/index.ts"
import hasBinaryAssociativePattern from "./hasBinaryAssociativePattern/index.ts"
import hasStructuralAssociativity from "./hasStructuralAssociativity/index.ts"
import isAssociativeName from "./isAssociativeName/index.ts"

//++ Detects if a function is associative (f(f(a,b),c) = f(a,f(b,c)))
export default function isAssociative(source: string): boolean {
	const functionName = extractFunctionName(source)

	return (
		isAssociativeName(functionName) ||
		containsAssociativeCode(source) ||
		hasBinaryAssociativePattern(source) ||
		hasAnyPattern(COLLECTION_ASSOCIATIVE_PATTERNS)(source) ||
		hasStructuralAssociativity(source)
	)
}

import containsCommutativeCode from "./containsCommutativeCode/index.ts"
import extractFunctionName from "./extractFunctionName/index.ts"
import hasSymmetricParameters from "./hasSymmetricParameters/index.ts"
import isCommutativeName from "./isCommutativeName/index.ts"

//++ Detects if a function is commutative (f(a,b) = f(b,a))
export default function isCommutative(source: string): boolean {
	const functionName = extractFunctionName(source)

	return (
		isCommutativeName(functionName) ||
		containsCommutativeCode(source) ||
		hasSymmetricParameters(source)
	)
}

//?? [EXAMPLE] isCommutative("function add(a, b) { return a + b }") // true
//?? [EXAMPLE] isCommutative("const multiply = (x, y) => x * y") // true
//?? [EXAMPLE] isCommutative("function subtract(a, b) { return a - b }") // false

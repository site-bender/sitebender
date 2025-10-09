import type { ParsedFunction } from "../types/index.ts"
import extractFunctionDetails from "../extractFunctionDetails/index.ts"

//++ Extracts function details from a function node
export default function _extractDetails(node: unknown): ParsedFunction {
	return extractFunctionDetails(node)
}

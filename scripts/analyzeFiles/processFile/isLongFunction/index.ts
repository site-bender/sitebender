import type { FileFunction } from "../../types/index.ts"

//++ Checks if a function exceeds the maximum line count
export default function isLongFunction(
	maxLines: number,
): (f: FileFunction) => boolean {
	return function isLongFunctionImpl(f: FileFunction): boolean {
		return f.loc > maxLines
	}
}

import type { FileFunction } from "../../types/index.ts"

//++ Checks if a function is not anonymous
export default function isNotAnonymous(fn: FileFunction): boolean {
	return fn.name !== "<anonymous>"
}
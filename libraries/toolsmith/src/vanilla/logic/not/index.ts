import type { Value } from "../../../types/index.ts"

//++ Performs logical NOT operation on a value
export default function not(value: Value): boolean {
	return !value
}

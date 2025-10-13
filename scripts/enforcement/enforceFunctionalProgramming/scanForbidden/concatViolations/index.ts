import concat from "@sitebender/toolsmith/array/concat/index.ts"

import type { Violation } from "../../../../../types/enforcement/Violation.ts"

export default function concatViolations(
	acc: Array<Violation>,
	arr: Array<Violation>,
): Array<Violation> {
	return concat(acc)(arr)
}

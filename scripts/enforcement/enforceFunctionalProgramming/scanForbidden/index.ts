import map from "@sitebender/toolsmith/array/map/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"

import type { Violation } from "../../../../types/enforcement/Violation.ts"

import { FP_FORBIDDEN } from "../../../constants/index.ts"
import concatViolations from "./concatViolations/index.ts"
import scanRule from "./scanRule/index.ts"

export default function scanForbidden(file: string) {
	return function scanForbiddenInLines(lines: Array<string>): Array<Violation> {
		return pipe([
			map(scanRule(file, lines)),
			reduce(concatViolations)([] as Array<Violation>),
		])(FP_FORBIDDEN)
	}
}

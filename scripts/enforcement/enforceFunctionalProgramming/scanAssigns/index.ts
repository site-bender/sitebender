import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"

import type { Violation } from "../../../../types/enforcement/Violation.ts"

import assignMatcher from "../assignMatcher/index.ts"
import toViolation from "./toViolation/index.ts"

export default function scanAssigns(file: string) {
	return function scanAssignsInSource(source: string): Array<Violation> {
		const assigns = assignMatcher(source)

		return pipe([map(toViolation(file, source))])(assigns)
	}
}

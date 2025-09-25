import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"

import type { AliasViolation } from "../../types/index.ts"

import checkLineForViolations from "../checkLineForViolations/index.ts"

//++ Checks an entire file for import alias violations
export default function checkFileForAliasViolations(
	file: string,
	text: string,
): Array<AliasViolation> {
	const lines = split(/\r?\n/)(text)

	return flatMap((line: string, idx: number) =>
		checkLineForViolations(file, line, idx + 1)
	)(lines)
}

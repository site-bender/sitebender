import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import includes from "@sitebender/toolsmith/vanilla/string/includes/index.ts"
import startsWith from "@sitebender/toolsmith/vanilla/string/startsWith/index.ts"

import type { AliasViolation } from "../../types/index.ts"

import {
	ARCHITECT_SRC,
	ARCHITECT_TYPES,
	TOOLSMITH_SRC,
} from "../../constants/index.ts"
import extractImportSpecifier from "../extractImportSpecifier/index.ts"
import findAllMatches from "../findAllMatches/index.ts"
import isInsidePackage from "../isInsidePackage/index.ts"

//++ Checks a single line for import alias violations
export default function checkLineForViolations(
	file: string,
	line: string,
	lineNumber: number,
): Array<AliasViolation> {
	const importRe = /(import|export)\s+[^;]*?from\s+["']([^"']+)["']/g
	const matches = findAllMatches(importRe, line)

	return flatMap((match: RegExpExecArray) => {
		const spec = extractImportSpecifier(match)
		const violations: Array<AliasViolation> = []

		// Skip allowed aliases
		if (
			startsWith("@sitebender/architect/")(spec) ||
			startsWith("@sitebender/architect-types/")(spec) ||
			startsWith("@sitebender/toolsmith/")(spec)
		) {
			return violations
		}

		// Check architect violations
		if (!isInsidePackage(file, "libraries/architect")) {
			if (includes(ARCHITECT_SRC)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint:
						"Use @sitebender/architect/… instead of libraries/architect/src/…",
				})
			}
			if (includes(ARCHITECT_TYPES)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint:
						"Use @sitebender/architect-types/… instead of libraries/architect/types/…",
				})
			}
		}

		// Check toolsmith violations
		if (!isInsidePackage(file, "libraries/toolsmith")) {
			if (includes(TOOLSMITH_SRC)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint:
						"Use @sitebender/toolsmith/… instead of libraries/toolsmith/src/…",
				})
			}
		}

		return violations
	})(matches)
}

import flatMap from "@sitebender/toolsmith/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import includes from "@sitebender/toolsmith/string/includes/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"

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
			startsWith("@sitebender/artificer/")(spec) ||
			startsWith("@sitebender/artificer-types/")(spec) ||
			startsWith("@sitebender/toolsmith/")(spec)
		) {
			return violations
		}

		// Check artificer violations
		if (!isInsidePackage(file, "libraries/artificer")) {
			if (includes(ARCHITECT_SRC)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint:
						"Use @sitebender/artificer/… instead of libraries/artificer/src/…",
				})
			}
			if (includes(ARCHITECT_TYPES)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint:
						"Use @sitebender/artificer-types/… instead of libraries/artificer/types/…",
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

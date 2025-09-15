import type { AliasViolation } from "../../types/index.ts"

import flatMap from "@sitebender/toolkit/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import startsWith from "@sitebender/toolkit/vanilla/string/startsWith/index.ts"
import includes from "@sitebender/toolkit/vanilla/string/includes/index.ts"

import {
	ENGINE_SRC,
	ENGINE_TYPES,
	TOOLKIT_SRC,
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
			startsWith("@sitebender/engine/")(spec) ||
			startsWith("@sitebender/engine-types/")(spec) ||
			startsWith("@sitebender/toolkit/")(spec)
		) {
			return violations
		}

		// Check engine violations
		if (!isInsidePackage(file, "libraries/engine")) {
			if (includes(ENGINE_SRC)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint: "Use @sitebender/engine/… instead of libraries/engine/src/…",
				})
			}
			if (includes(ENGINE_TYPES)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint: "Use @sitebender/engine-types/… instead of libraries/engine/types/…",
				})
			}
		}

		// Check toolkit violations
		if (!isInsidePackage(file, "libraries/toolkit")) {
			if (includes(TOOLKIT_SRC)(spec)) {
				violations.push({
					file,
					line: lineNumber,
					spec,
					hint: "Use @sitebender/toolkit/… instead of libraries/toolkit/src/…",
				})
			}
		}

		return violations
	})(matches)
}
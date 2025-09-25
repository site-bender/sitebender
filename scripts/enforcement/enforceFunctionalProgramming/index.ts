import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"

import type { Violation } from "../../../types/enforcement/Violation.ts"

import isPedantic from "./isPedantic/index.ts"
// FP_ALLOWLIST handled within loadFile helper

import iterateFiles from "./iterateFiles/index.ts"
import loadFile from "./loadFile/index.ts"
import mapEntryToViolations from "./mapEntryToViolations/index.ts"
import pickPatterns from "./pickPatterns/index.ts"
import prepareGlobs from "./prepareGlobs/index.ts"
import printViolation from "./printViolation/index.ts"
import scanAssigns from "./scanAssigns/index.ts"
import concatViolations from "./scanForbidden/concatViolations/index.ts"
import scanForbidden from "./scanForbidden/index.ts"
import toLines from "./toLines/index.ts"

export default async function enforceFunctionalProgramming(
	globsArg: Array<string> = Deno.args,
): Promise<void> {
	const pedantic = isPedantic(globsArg)
	const globs = prepareGlobs(globsArg)
	const patterns = pickPatterns(globs)

	const files = await iterateFiles(patterns)

	const loaded = await Promise.all(files.map(loadFile))
	const usable = loaded.filter((x): x is { file: string; source: string } =>
		x !== null
	)

	const violations = pipe([
		map(mapEntryToViolations(pedantic, toLines, scanForbidden, scanAssigns)),
		reduce(concatViolations)([] as Array<Violation>),
	])(usable)

	if (violations.length) {
		console.error("Strict FP violations found:\n")
		pipe([map(printViolation)])(violations)
		console.error(`\nTotal: ${violations.length}`)
		Deno.exit(1)
	}

	console.log("Strict FP check passed (no violations)")
}

if (import.meta.main) {
	await enforceFunctionalProgramming()
}

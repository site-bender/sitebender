import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import isEmpty from "@sitebender/toolsmith/vanilla/array/isEmpty/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import sort from "@sitebender/toolsmith/vanilla/array/sort/index.ts"
import not from "@sitebender/toolsmith/vanilla/logic/not/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import { relative } from "jsr:@std/path"

import type { FileFunction, PerFileAnalysis } from "../types/index.ts"

import { FUNCTION_PATTERNS } from "../constants/index.ts"
import createFunctionInfo from "./createFunctionInfo/index.ts"
import extractDefaultNames from "./extractDefaultNames/index.ts"
import extractMatches from "./extractMatches/index.ts"
import isNotAnonymous from "./isNotAnonymous/index.ts"
import stripCommentsAndStrings from "./stripCommentsAndStrings/index.ts"

//++ Analyzes a TypeScript/JavaScript file to extract function metrics and export patterns
export default async function analyzeFile(
	opts: { absPath: string; root: string; onlyDefault?: boolean },
): Promise<PerFileAnalysis> {
	const text = await Deno.readTextFile(opts.absPath)
	const lines = split("\n")(text)
	const clean = stripCommentsAndStrings(text)

	const matches = extractMatches(FUNCTION_PATTERNS.simple)(clean)

	const mapToFunctionInfo = map(createFunctionInfo(text))
	const functions = mapToFunctionInfo(matches)

	const filteredFunctions = opts.onlyDefault
		? filter(isNotAnonymous)(functions)
		: functions

	const defaultNames = extractDefaultNames(matches)
	const sortedDefaultNames = not(isEmpty(defaultNames))
		? sort<string>(undefined)(defaultNames)
		: undefined

	return {
		pathAbs: opts.absPath,
		pathRel: relative(opts.root, opts.absPath),
		lines: length(lines),
		functions: filteredFunctions,
		nonDefaultExported: undefined,
		defaultNames: sortedDefaultNames,
	}
}

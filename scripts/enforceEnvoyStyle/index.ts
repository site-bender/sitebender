//++ Enforces Envoy style and structural rules across the codebase
// Usage: deno run --allow-read scripts/enforceEnvoyStyle/index.ts
// Reads libraries/envoy/SCRIBE_RULES.json and scans targetGlobs.

import { globToRegExp } from "https://deno.land/std@0.224.0/path/mod.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import slice from "@sitebender/toolsmith/vanilla/string/slice/index.ts"
import startsWith from "@sitebender/toolsmith/vanilla/string/startsWith/index.ts"
import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"
import includes from "@sitebender/toolsmith/vanilla/string/includes/index.ts"
import match from "@sitebender/toolsmith/vanilla/string/match/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import forEach from "@sitebender/toolsmith/vanilla/array/forEach/index.ts"
import push from "@sitebender/toolsmith/vanilla/array/push/index.ts"
import test from "@sitebender/toolsmith/vanilla/regex/test/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"

type ScribeRules = {
	requireMarkerAboveExport: boolean
	requireBlankLineAfterGuardReturn: boolean
	enforceCurriedNesting: boolean
	curriedNestingDepth: number
	forbidNativeArrayMethods: string[]
	guardReturnPattern: string
	targetGlobs: string[]
}

type Violation = { file: string; line: number; rule: string; detail: string }

//++ Reads Envoy rules from configuration file
async function readRules(): Promise<ScribeRules> {
	const raw = await Deno.readTextFile("libraries/envoy/SCRIBE_RULES.json")
	return JSON.parse(raw)
}

//++ Iterates through files matching the given glob patterns
async function* iterFiles(globs: Array<string>) {
	for (const g of globs) {
		const re = globToRegExp(g, { globstar: true })
		for await (const path of walkDir(".")) {
			const rel = startsWith("./")(path)
				? slice(2)(Infinity)(path)
				: replace(/^\.\//, "")(path)
			if (test(re)(rel)) yield rel
		}
	}
}

//++ Recursively walks a directory and yields all file paths
async function* walkDir(dir: string): AsyncGenerator<string> {
	for await (const e of Deno.readDir(dir)) {
		const path = dir === "." ? e.name : `${dir}/${e.name}`
		if (e.isDirectory) {
			yield* walkDir(path)
		} else yield path
	}
}

//++ Checks a file for Envoy rule violations
function checkFile(
	rules: ScribeRules,
	file: string,
	text: string,
): Array<Violation> {
	const out: Array<Violation> = []
	const lines = split(/\r?\n/)(text)

	if (rules.requireMarkerAboveExport) {
		forEach<string>((ln: string, i: number) => {
			if (test(/^export default function/)(ln)) {
				const prev = lines[i - 1] ?? ""
				if (!test(/^\/\/\+\+/)(prev)) {
					push({
						file,
						line: i + 1,
						rule: "marker-above-export",
						detail: "Missing //++ line immediately above export",
					})(out)
				}
			}
		})(lines)
	}

	if (rules.requireBlankLineAfterGuardReturn) {
		for (let i = 0; i < length(lines); i++) {
			if (includes(rules.guardReturnPattern)(lines[i])) {
				const next = lines[i + 1] ?? ""
				if (trim(next) !== "") {
					push({
						file,
						line: i + 2,
						rule: "blank-after-guard",
						detail: "Expected blank line after guard return",
					})(out)
				}
			}
		}
	}

	if (rules.enforceCurriedNesting) {
		// simple heuristic: count nested 'return function' in file
		const nestMatches = match(/return function /g)(text) || []
		if (length(nestMatches) < rules.curriedNestingDepth - 1) {
			push({
				file,
				line: 1,
				rule: "curried-nesting",
				detail: `Expected >= ${rules.curriedNestingDepth} curried layers`,
			})(out)
		}
	}

	if (length(rules.forbidNativeArrayMethods)) {
		const forbid = new RegExp(
			`\\.(${join("|")(rules.forbidNativeArrayMethods)})\\(`,
		)
		forEach<string>((ln: string, i: number) => {
			if (test(forbid)(ln)) {
				push({
					file,
					line: i + 1,
					rule: "native-array-method",
					detail: trim(ln),
				})(out)
			}
		})(lines)
	}

	return out
}

//++ Main function that enforces Envoy style across the codebase
export default async function enforceEnvoyStyle() {
	const rules = await readRules()
	const violations: Array<Violation> = []
	for await (const file of iterFiles(rules.targetGlobs)) {
		if (!endsWith(".ts")(file)) continue
		try {
			const text = await Deno.readTextFile(file)
			const newViolations = checkFile(rules, file, text)
			forEach<Violation>((v: Violation) => push(v)(violations))(newViolations)
		} catch (e) {
			// ignore unreadable file (permissions / deleted race)
			if (Deno.env.get("SCRIBE_STYLE_DEBUG")) {
				console.error("skip file", file, e)
			}
		}
	}
	if (length(violations)) {
		console.error("Envoy style violations:\n")
		for (const v of violations) {
			console.error(`${v.file}:${v.line} [${v.rule}] ${v.detail}`)
		}
		console.error(`\nTotal: ${length(violations)}`)
		Deno.exit(1)
	}
	console.log("Envoy style check passed (no violations)")
}

if (import.meta.main) {
	await enforceEnvoyStyle()
}

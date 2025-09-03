#!/usr/bin/env -S deno run --allow-read
/**
 * Enforce repo alias policy for cross-package imports. One function per folder.
 * Helpers live in ./helpers and shared constants in scripts/constants.
 */

import { DEFAULT_ALIAS_SCOPES } from "../../constants/index.ts"
import findViolations from "./helpers/findViolations/index.ts"
import type { Violation } from "./types/index.ts"

export default async function runAliasGuards(
	rootsArg?: string[],
): Promise<Violation[]> {
	const roots = rootsArg?.length ? rootsArg : DEFAULT_ALIAS_SCOPES
	return await findViolations(roots)
}

if (import.meta.main) {
	const roots = Deno.args.length ? Deno.args : DEFAULT_ALIAS_SCOPES
	const violations = await runAliasGuards(roots)
	if (violations.length) {
		console.error("Alias policy violations:\n")
		for (const v of violations) {
			console.error(`${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`)
		}
		console.error(`\nTotal: ${violations.length} violation(s).`)
		Deno.exit(1)
	}
	console.log("Alias policy: OK (no violations found).")
}

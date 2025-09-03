#!/usr/bin/env -S deno run --allow-read
import runAliasGuards from "./aliasGuards/index.ts"

export default runAliasGuards

if (import.meta.main) {
	const roots = Deno.args.length ? Deno.args : undefined
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

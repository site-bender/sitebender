/// <reference lib="deno.ns" />
import includes from "@sitebender/toolsmith/array/includes/index.ts"

import _printHelp from "./_printHelp/index.ts"

//++ Steward CLI: fix (alpha stub)
// Purpose: Entry point for applying safe autofixes, followed by fmt and a re-check.
// Policy: ZERO arrow functions; named functions only. Envoy comments mandatory for exports.

export default async function stewardFix(): Promise<void> {
	const args = Deno.args
	const showHelp = includes("--help")(args) || includes("-h")(args)
	const isDryRun = includes("--dry-run")(args)

	if (showHelp) {
		_printHelp()
		return
	}

	console.log(`Steward (alpha): fix stub${isDryRun ? " (dry-run)" : ""}`)
	console.log("Rule inventory: docs/steward-rules.md")
	console.log("No fixes executed in this stub build.")
}

if (import.meta.main) {
	await stewardFix()
}

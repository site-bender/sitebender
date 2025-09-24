/// <reference lib="deno.ns" />
import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"
import printHelp from "./_printHelp/index.ts"

//++ Steward CLI: check (alpha stub)
// Purpose: Entry point for running read-only checks. Deterministic, non-configurable.
// No arrow functions are allowed anywhere. Named functions only.

export default async function stewardCheck(): Promise<void> {
	const args = Deno.args
	const showHelp = includes("--help")(args) || includes("-h")(args)

	if (showHelp) {
		printHelp()
		return
	}

	console.log("Steward (alpha): check stub")
	console.log("Rule inventory: docs/steward-rules.md")
	console.log("No checks executed in this stub build.")
}

if (import.meta.main) {
	await stewardCheck()
}

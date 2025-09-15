#!/usr/bin/env -S deno run --allow-read --allow-run

//++ Validate library contract & boundary compliance (prints violations; exits 1 on error)

import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import length from "@sitebender/toolkit/vanilla/array/length/index.ts"

import collectResults from "./collectResults/index.ts"
import formatViolations from "./formatViolations/index.ts"
import { VIOLATION_CHECKS } from "./violationChecks/index.ts"
import logWarning from "./logWarning/index.ts"
import logError from "./logError/index.ts"
import createBar from "./createBar/index.ts"

export async function validateContracts(): Promise<boolean> {
	console.log("🔍 Checking contract compliance...")

	const results = await collectResults(VIOLATION_CHECKS)

	const { errors, warnings } = formatViolations(results)

	reduce(logWarning)(null)(warnings)

	if (length(errors) > 0) {
		const bar = createBar(60)
		console.error("\n🚨 CONTRACT VIOLATIONS DETECTED 🚨")
		console.error(bar)
		reduce(logError)(null)(errors)
		console.error(bar)
		console.error("\n❌ Commit blocked due to contract violations.")
		console.error("Fix the violations above before committing.\n")
		return false
	}

	console.log("✅ All contract checks passed!")
	return true
}

export default validateContracts

// Execute when run as script
const success = await validateContracts()

if (!success) {
	Deno.exit(1)
}

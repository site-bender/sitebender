#!/usr/bin/env -S deno run --allow-read --allow-run

//++ Validate library contract & boundary compliance (prints violations; exits 1 on error)
import { VIOLATION_CHECKS } from './violationChecks/index.ts'
import collectResults from './collectResults/index.ts'
import formatViolations from './formatViolations/index.ts'

export async function validateContracts(): Promise<boolean> {
	console.log('🔍 Checking contract compliance...')

	const results = await collectResults(VIOLATION_CHECKS)

	const { errors, warnings } = formatViolations(results)

	warnings.forEach((w) => console.warn(`⚠️  Warning: ${w}`))

	if (errors.length > 0) {
		const bar = '='.repeat(60)
		console.error('\n🚨 CONTRACT VIOLATIONS DETECTED 🚨')
		console.error(bar)
		errors.forEach((e) => console.error(e))
		console.error(bar)
		console.error('\n❌ Commit blocked due to contract violations.')
		console.error('Fix the violations above before committing.\n')
		return false
	}

	console.log('✅ All contract checks passed!')
	return true
}

export default validateContracts

// Execute when run as script
const success = await validateContracts()

if (!success) {
	Deno.exit(1)
}

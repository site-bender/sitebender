import { assert, assertEquals } from "@std/assert"

import { runAll } from "./index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

//++ Tests for runAll

Deno.test("runAll returns correct structure", async () => {
	const result = await runAll()

	assert(typeof result.runId === "string")
	assert(Array.isArray(result.results))
	assert(
		result.decision === "allow" || result.decision === "warn" ||
			result.decision === "block",
	)
	assert(typeof result.summary === "object")
})

Deno.test("runAll includes graphHashGate as block phase", async () => {
	const result = await runAll()
	const graphHashGate = result.results.find((r) => r.name === "graphHashGate")

	assert(graphHashGate !== undefined)
	assertEquals(graphHashGate?.phase, "block")
})

Deno.test("runAll includes pending scripts", async () => {
	const result = await runAll()
	const pendingScripts = [
		"structureAudit",
		"importsAudit",
		"commentsAudit",
		"hashValidation",
	]

	map((scriptName: string) => {
		const script = result.results.find((r) => r.name === scriptName)
		assert(script !== undefined)
		assertEquals(script?.phase, "pending")
		assertEquals(script?.status, "pending")
	})(pendingScripts)
})

Deno.test("runAll returns valid ISO timestamp", async () => {
	const result = await runAll()
	const date = new Date(result.runId)

	assert(!isNaN(date.getTime()))
})

Deno.test("runAll summary has all required fields", async () => {
	const result = await runAll()

	assert("critical" in result.summary)
	assert("high" in result.summary)
	assert("medium" in result.summary)
	assert("info" in result.summary)
	assert("blockers" in result.summary)

	assertEquals(typeof result.summary.critical, "number")
	assertEquals(typeof result.summary.high, "number")
	assertEquals(typeof result.summary.medium, "number")
	assertEquals(typeof result.summary.info, "number")
	assertEquals(typeof result.summary.blockers, "number")
})

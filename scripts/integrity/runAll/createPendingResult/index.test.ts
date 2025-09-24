import { assertEquals } from "@std/assert"

import { createPendingResult } from "./index.ts"

//++ Tests for createPendingResult
Deno.test("createPendingResult creates correct structure", () => {
	const result = createPendingResult("testScript")

	assertEquals(result, {
		name: "testScript",
		phase: "pending",
		status: "pending",
	})
})

Deno.test("createPendingResult handles different names", () => {
	const result1 = createPendingResult("structureAudit")
	const result2 = createPendingResult("importsAudit")

	assertEquals(result1.name, "structureAudit")
	assertEquals(result1.phase, "pending")
	assertEquals(result1.status, "pending")

	assertEquals(result2.name, "importsAudit")
	assertEquals(result2.phase, "pending")
	assertEquals(result2.status, "pending")
})

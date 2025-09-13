import { assertEquals } from "@std/assert"

import { runGraphHashGate } from "./index.ts"

//++ Tests for runGraphHashGate
Deno.test("runGraphHashGate returns expected structure", async () => {
	const result = await runGraphHashGate()

	assertEquals(result.name, "graphHashGate")
	assertEquals(result.phase, "block")
	assertEquals(result.status, "ok")
	assertEquals(Array.isArray(result.messages), true)
})

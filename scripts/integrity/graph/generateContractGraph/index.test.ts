import { assertEquals, assertExists } from "@std/assert"

import generateContractGraph from "./index.ts"

//++ Tests for generateContractGraph
Deno.test("generateContractGraph creates expected files", async () => {
	// Run the function
	await generateContractGraph()

	// Check that files were created
	const graphExists = await Deno.stat("reports/integrity/contract-graph.json")
		.then(() => true)
		.catch(() => false)
	const hashExists = await Deno.stat(
		"reports/integrity/contract-graph.hash.json",
	)
		.then(() => true)
		.catch(() => false)

	assertEquals(graphExists, true)
	assertEquals(hashExists, true)
})

Deno.test("generateContractGraph creates valid JSON files", async () => {
	await generateContractGraph()

	// Read and parse the generated files
	const graphText = await Deno.readTextFile(
		"reports/integrity/contract-graph.json",
	)
	const hashText = await Deno.readTextFile(
		"reports/integrity/contract-graph.hash.json",
	)

	// Should not throw
	const graph = JSON.parse(graphText)
	const hash = JSON.parse(hashText)

	assertExists(graph)
	assertExists(hash)
})

Deno.test("generateContractGraph hash file has expected structure", async () => {
	await generateContractGraph()

	const hashText = await Deno.readTextFile(
		"reports/integrity/contract-graph.hash.json",
	)
	const hashData = JSON.parse(hashText)

	assertEquals(hashData.artifact, "contract-graph")
	assertEquals(hashData.version, 1)
	assertEquals(hashData.schemaVersion, 1)
	assertEquals(hashData.preferred, "sha256")
	assertExists(hashData.hashes.sha256)
	assertExists(hashData.generatedAt)

	// Verify it's a valid timestamp
	const instant = Temporal.Instant.from(hashData.generatedAt)
	assertExists(instant)
})

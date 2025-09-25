import hashArtifact from "./index.ts"

Deno.test("hashArtifact generates consistent hashes", async () => {
	const data = { test: "value", number: 42 }
	const hash1 = await hashArtifact(data)
	const hash2 = await hashArtifact(data)

	// Same input should produce same hash
	console.assert(hash1 === hash2, "Hash should be consistent")
})

Deno.test("hashArtifact generates different hashes for different data", async () => {
	const data1 = { test: "value1" }
	const data2 = { test: "value2" }

	const hash1 = await hashArtifact(data1)
	const hash2 = await hashArtifact(data2)

	// Different input should produce different hashes
	console.assert(
		hash1 !== hash2,
		"Different data should produce different hashes",
	)
})

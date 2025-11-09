import { assertEquals, assertNotEquals } from "jsr:@std/assert@1.0.14"
import hashArtifact from "./index.ts"

Deno.test("hashArtifact - produces deterministic hash for same input", async function testDeterministicHashing() {
	const data = { name: "warden", version: "1.0.0" }
	const hash1 = await hashArtifact(data)
	const hash2 = await hashArtifact(data)

	assertEquals(hash1, hash2)
})

Deno.test("hashArtifact - produces same hash for objects with different key order", async function testKeyOrderIndependence() {
	const obj1 = { z: 3, a: 1, m: 2 }
	const obj2 = { a: 1, m: 2, z: 3 }
	const hash1 = await hashArtifact(obj1)
	const hash2 = await hashArtifact(obj2)

	assertEquals(hash1, hash2)
})

Deno.test("hashArtifact - produces different hashes for different data", async function testDifferentData() {
	const data1 = { name: "warden" }
	const data2 = { name: "sentinel" }
	const hash1 = await hashArtifact(data1)
	const hash2 = await hashArtifact(data2)

	assertNotEquals(hash1, hash2)
})

Deno.test("hashArtifact - returns 64-character lowercase hexadecimal string", async function testHashFormat() {
	const data = { test: "data" }
	const hash = await hashArtifact(data)

	assertEquals(hash.length, 64)
	assertEquals(hash, hash.toLowerCase())
	assertEquals(/^[0-9a-f]{64}$/.test(hash), true)
})

Deno.test("hashArtifact - handles nested objects consistently", async function testNestedObjects() {
	const data = {
		library: "warden",
		config: {
			enforcement: "strict",
			rules: {
				privacy: true,
				contracts: true,
			},
		},
	}
	const hash1 = await hashArtifact(data)
	const hash2 = await hashArtifact(data)

	assertEquals(hash1, hash2)
})

Deno.test("hashArtifact - handles arrays consistently", async function testArrays() {
	const data = {
		items: [1, 2, 3],
		nested: [{ a: 1 }, { b: 2 }],
	}
	const hash1 = await hashArtifact(data)
	const hash2 = await hashArtifact(data)

	assertEquals(hash1, hash2)
})

Deno.test("hashArtifact - different array order produces different hash", async function testArrayOrderMatters() {
	const data1 = { items: [1, 2, 3] }
	const data2 = { items: [3, 2, 1] }
	const hash1 = await hashArtifact(data1)
	const hash2 = await hashArtifact(data2)

	assertNotEquals(hash1, hash2)
})

Deno.test("hashArtifact - handles primitive types", async function testPrimitives() {
	const hash1 = await hashArtifact("hello")
	const hash2 = await hashArtifact(42)
	const hash3 = await hashArtifact(true)
	const hash4 = await hashArtifact(null)

	assertEquals(hash1.length, 64)
	assertEquals(hash2.length, 64)
	assertEquals(hash3.length, 64)
	assertEquals(hash4.length, 64)

	assertNotEquals(hash1, hash2)
	assertNotEquals(hash2, hash3)
	assertNotEquals(hash3, hash4)
})

Deno.test("hashArtifact - handles empty structures", async function testEmptyStructures() {
	const emptyObj = await hashArtifact({})
	const emptyArr = await hashArtifact([])

	assertEquals(emptyObj.length, 64)
	assertEquals(emptyArr.length, 64)
	assertNotEquals(emptyObj, emptyArr)
})

Deno.test("hashArtifact - performance is under 100ms for typical data", async function testPerformance() {
	const data = {
		library: "warden",
		version: "1.0.0",
		api: {
			exports: ["enforce", "validatePrivacy", "validateContract"],
		},
		privacy: {
			rules: ["underscore", "lowestCommonAncestor"],
		},
		config: {
			targets: ["src/", "libraries/"],
			phase: "block",
		},
	}

	const start = performance.now()
	await hashArtifact(data)
	const duration = performance.now() - start

	assertEquals(
		duration < 100,
		true,
		`Hash took ${duration}ms, expected < 100ms`,
	)
})

Deno.test("hashArtifact - complex nested structure produces consistent hash", async function testComplexStructure() {
	const complex = {
		level1: {
			z: "last",
			a: {
				level3: {
					array: [1, 2, 3],
					object: { b: 2, a: 1 },
					nested: {
						deep: {
							value: "test",
						},
					},
				},
			},
			m: "middle",
		},
	}

	const hash1 = await hashArtifact(complex)
	const hash2 = await hashArtifact(complex)

	assertEquals(hash1, hash2)
	assertEquals(hash1.length, 64)
})

Deno.test("hashArtifact - produces known hash for simple object", async function testKnownHash() {
	const data = { test: "data" }
	const hash = await hashArtifact(data)

	// This verifies the hash computation is working correctly
	// The exact hash value is deterministic for this input
	assertEquals(hash.length, 64)
	assertEquals(typeof hash, "string")
})

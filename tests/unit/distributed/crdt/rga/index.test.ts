import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createRGA from "../../../../../libraries/distributed/src/crdt/rga/index.ts"

describe("RGA (Replicated Growable Array) CRDT", () => {
	it("should create an empty RGA", () => {
		const rga = createRGA([], "node1")
		assertEquals(rga.toArray(), [])
		assertEquals(rga.nodeId, "node1")
		assertEquals(rga.version, 0)
	})

	it("should insert at the beginning", () => {
		const rga = createRGA([], "node1")
		const inserted = rga.insertAfter(null, "first")

		assertEquals(inserted.toArray(), ["first"])
		assertEquals(inserted.version, 1)
	})

	it("should build a sequence", () => {
		const rga = createRGA([], "node1")
			.insertAfter(null, "a")

		// Get the id of the first element
		const firstId = rga.value[0].id

		const rga2 = rga.insertAfter(firstId, "b")
		const secondId = rga2.value.find((n) => n.value === "b")?.id

		const rga3 = rga2.insertAfter(secondId, "c")

		assertEquals(rga3.toArray(), ["a", "b", "c"])
	})

	it("should delete elements", () => {
		const rga = createRGA([], "node1")
			.insertAfter(null, "a")

		const firstId = rga.value[0].id
		const rga2 = rga.insertAfter(firstId, "b")
		const secondId = rga2.value.find((n) => n.value === "b")?.id
		const rga3 = rga2.insertAfter(secondId, "c")

		// Delete the middle element
		const deleted = rga3.delete(secondId!)

		assertEquals(deleted.toArray(), ["a", "c"])

		// Node should still exist but be tombstoned
		const tombstoned = deleted.value.find((n) => n.id === secondId)
		assert(tombstoned?.tombstone === true)
	})

	it("should handle concurrent insertions", () => {
		const base = createRGA([], "node1")
			.insertAfter(null, "a")

		const firstId = base.value[0].id

		// Two nodes insert after the same element
		const node1 = base.insertAfter(firstId, "b1")
		const node2 = createRGA(base.value, "node2").insertAfter(firstId, "b2")

		const merged1 = node1.merge(node2)
		const merged2 = node2.merge(node1)

		// Both should converge to same order (deterministic by id)
		assertEquals(merged1.toArray(), merged2.toArray())

		// Should contain all elements
		const array = merged1.toArray()
		assert(array.includes("a"))
		assert(array.includes("b1"))
		assert(array.includes("b2"))
	})

	it("should handle concurrent delete and insert", () => {
		const base = createRGA([], "node1")
			.insertAfter(null, "a")

		const firstId = base.value[0].id
		const withB = base.insertAfter(firstId, "b")
		const bId = withB.value.find((n) => n.value === "b")?.id

		// Node 1 deletes b
		const node1 = withB.delete(bId!)

		// Node 2 inserts after b (concurrent with delete)
		const node2 = createRGA(withB.value, "node2").insertAfter(bId, "c")

		const merged = node1.merge(node2)

		// Should have a and c (b is deleted)
		const array = merged.toArray()
		assert(array.includes("a"))
		assert(!array.includes("b"))
		assert(array.includes("c"))
	})

	it("should serialize to JSON", () => {
		const rga = createRGA([], "node1")
			.insertAfter(null, "test")

		const serialized = rga.serialize()
		const parsed = JSON.parse(serialized)

		assertEquals(parsed.nodeId, "node1")
		assertEquals(parsed.version, 1)
		assertEquals(parsed.nodes.length, 1)
		assertEquals(parsed.nodes[0].value, "test")
	})

	it("should maintain order with topological sort", () => {
		// Create a complex structure
		const rga = createRGA([], "node1")
			.insertAfter(null, "1")

		const id1 = rga.value[0].id
		const rga2 = rga.insertAfter(id1, "2")
		const id2 = rga2.value.find((n) => n.value === "2")?.id
		const rga3 = rga2.insertAfter(id2, "3")
		const rga4 = rga3.insertAfter(id1, "1.5")

		const array = rga4.toArray()

		// Should maintain proper order
		const indexOf1 = array.indexOf("1")
		const indexOf15 = array.indexOf("1.5")
		const indexOf2 = array.indexOf("2")
		const indexOf3 = array.indexOf("3")

		assert(indexOf1 < indexOf15)
		assert(indexOf1 < indexOf2)
		assert(indexOf2 < indexOf3)
	})

	it("should maintain commutativity property", () => {
		const rga1 = createRGA([], "node1").insertAfter(null, "a")
		const rga2 = createRGA([], "node2").insertAfter(null, "b")
		const rga3 = createRGA([], "node3").insertAfter(null, "c")

		const merged1 = rga1.merge(rga2).merge(rga3)
		const merged2 = rga3.merge(rga1).merge(rga2)

		// Elements should be in same order
		assertEquals(merged1.toArray(), merged2.toArray())
	})

	it("should maintain associativity property", () => {
		const rga1 = createRGA([], "node1").insertAfter(null, "a")
		const rga2 = createRGA([], "node2").insertAfter(null, "b")
		const rga3 = createRGA([], "node3").insertAfter(null, "c")

		const merged1 = (rga1.merge(rga2)).merge(rga3)
		const merged2 = rga1.merge(rga2.merge(rga3))

		assertEquals(merged1.toArray(), merged2.toArray())
	})

	it("should maintain idempotency property", () => {
		const rga = createRGA([], "node1")
			.insertAfter(null, "a")

		const firstId = rga.value[0].id
		const withB = rga.insertAfter(firstId, "b")

		const merged1 = withB.merge(withB)
		const merged2 = merged1.merge(withB)

		assertEquals(merged1.toArray(), withB.toArray())
		assertEquals(merged2.toArray(), withB.toArray())
	})
})

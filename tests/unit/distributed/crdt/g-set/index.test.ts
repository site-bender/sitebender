import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createGSet from "../../../../../libraries/distributed/src/crdt/g-set/index.ts"

describe("G-Set (Grow-Only Set) CRDT", () => {
	it("should create an empty set", () => {
		const set = createGSet(new Set(), "node1")
		assertEquals(set.toArray(), [])
		assertEquals(set.nodeId, "node1")
		assertEquals(set.version, 0)
	})

	it("should add items to the set", () => {
		const set = createGSet(new Set(), "node1")
		const set1 = set.add("item1")
		const set2 = set1.add("item2")

		assertEquals(set2.toArray().sort(), ["item1", "item2"])
		assertEquals(set2.version, 2)
		// Original unchanged
		assertEquals(set.toArray(), [])
	})

	it("should handle duplicate additions idempotently", () => {
		const set = createGSet(new Set(), "node1")
			.add("item1")
			.add("item1")
			.add("item1")

		// Should only have one copy
		assertEquals(set.toArray(), ["item1"])
		assertEquals(set.version, 3) // Version still increments
	})

	it("should check membership", () => {
		const set = createGSet(new Set(), "node1")
			.add("item1")
			.add("item2")

		assert(set.has("item1"))
		assert(set.has("item2"))
		assert(!set.has("item3"))
	})

	it("should merge sets with union semantics", () => {
		const set1 = createGSet(new Set(), "node1")
			.add("a")
			.add("b")

		const set2 = createGSet(new Set(), "node2")
			.add("b")
			.add("c")

		const merged1 = set1.merge(set2)
		const merged2 = set2.merge(set1)

		// Both should have union of all elements
		assertEquals(merged1.toArray().sort(), ["a", "b", "c"])
		assertEquals(merged2.toArray().sort(), ["a", "b", "c"])
	})

	it("should handle concurrent additions", () => {
		const base = createGSet(new Set(), "node1")

		// Two nodes add different items concurrently
		const node1 = createGSet(new Set(base.value), "node1").add("item1")
		const node2 = createGSet(new Set(base.value), "node2").add("item2")

		const merged = node1.merge(node2)

		assertEquals(merged.toArray().sort(), ["item1", "item2"])
	})

	it("should serialize to JSON", () => {
		const set = createGSet(new Set(), "node1")
			.add("item1")
			.add("item2")

		const serialized = set.serialize()
		const parsed = JSON.parse(serialized)

		assertEquals(parsed.nodeId, "node1")
		assertEquals(parsed.version, 2)
		assertEquals(parsed.items.sort(), ["item1", "item2"])
	})

	it("should work with different data types", () => {
		const numberSet = createGSet(new Set(), "node1")
			.add(1)
			.add(2)
			.add(3)

		assertEquals(numberSet.toArray().sort(), [1, 2, 3])

		const mixedSet = createGSet(new Set(), "node1")
			.add("string")
			.add(42)
			.add(true)

		assert(mixedSet.has("string"))
		assert(mixedSet.has(42))
		assert(mixedSet.has(true))
	})

	it("should maintain commutativity property", () => {
		const set1 = createGSet(new Set(), "node1").add("a")
		const set2 = createGSet(new Set(), "node2").add("b")
		const set3 = createGSet(new Set(), "node3").add("c")

		const merged1 = set1.merge(set2).merge(set3)
		const merged2 = set3.merge(set1).merge(set2)

		assertEquals(merged1.toArray().sort(), merged2.toArray().sort())
	})

	it("should maintain associativity property", () => {
		const set1 = createGSet(new Set(), "node1").add("a")
		const set2 = createGSet(new Set(), "node2").add("b")
		const set3 = createGSet(new Set(), "node3").add("c")

		const merged1 = (set1.merge(set2)).merge(set3)
		const merged2 = set1.merge(set2.merge(set3))

		assertEquals(merged1.toArray().sort(), merged2.toArray().sort())
	})

	it("should maintain idempotency property", () => {
		const set = createGSet(new Set(), "node1")
			.add("item1")
			.add("item2")

		const merged1 = set.merge(set)
		const merged2 = merged1.merge(set)

		assertEquals(merged1.toArray().sort(), set.toArray().sort())
		assertEquals(merged2.toArray().sort(), set.toArray().sort())
	})

	it("should correctly update version on merge", () => {
		const set1 = createGSet(new Set(), "node1", 5).add("a")
		const set2 = createGSet(new Set(), "node2", 3).add("b")

		const merged = set1.merge(set2)

		// Version should be max + 1
		assertEquals(merged.version, 7)
	})
})

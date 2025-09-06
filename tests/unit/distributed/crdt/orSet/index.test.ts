import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createORSet from "../../../../../libraries/distributed/src/crdt/orSet/index.ts"

describe("OR-Set CRDT", () => {
	it("should create an empty set", () => {
		const set = createORSet([], "node1")
		assertEquals(set.values(), [])
		assertEquals(set.nodeId, "node1")
		assertEquals(set.version, 0)
	})

	it("should add items to the set", () => {
		const set = createORSet([], "node1")
		const set1 = set.add("item1")
		const set2 = set1.add("item2")

		assertEquals(set2.values().sort(), ["item1", "item2"])
		assertEquals(set2.version, 2)
		// Original should be unchanged
		assertEquals(set.values(), [])
	})

	it("should remove items from the set", () => {
		const set = createORSet([], "node1")
			.add("item1")
			.add("item2")
			.add("item3")

		const removed = set.remove("item2")
		assertEquals(removed.values().sort(), ["item1", "item3"])
	})

	it("should handle concurrent add operations", () => {
		const set1 = createORSet([], "node1")
		const set2 = createORSet([], "node2")

		const set1WithA = set1.add("a")
		const set2WithB = set2.add("b")

		const merged1 = set1WithA.merge(set2WithB)
		const merged2 = set2WithB.merge(set1WithA)

		// Both should converge to the same state
		assertEquals(merged1.values().sort(), ["a", "b"])
		assertEquals(merged2.values().sort(), ["a", "b"])
	})

	it("should handle add-remove conflicts correctly", () => {
		const base = createORSet([], "node1")

		// Node 1 adds and removes "item"
		const node1 = base.add("item").remove("item")

		// Node 2 adds "item" concurrently
		const node2 = base.add("item")

		// Merge should preserve the add (OR-Set semantics)
		const merged1 = node1.merge(node2)
		const merged2 = node2.merge(node1)

		// The item should exist in both (add wins over concurrent remove)
		assert(merged1.has("item"))
		assert(merged2.has("item"))
	})

	it("should track tombstones for removed items", () => {
		const set = createORSet([], "node1")
			.add("item1")
			.add("item2")
			.remove("item1")

		// Item should not be in values
		assertEquals(set.values(), ["item2"])
		assert(!set.has("item1"))
		assert(set.has("item2"))

		// But tombstone should exist in internal state
		const tombstoned = set.value.find((item) =>
			item.value === "item1" && item.tombstone === true
		)
		assert(tombstoned !== undefined)
	})

	it("should serialize to JSON", () => {
		const set = createORSet([], "node1")
			.add("item1")
			.add("item2")

		const serialized = set.serialize()
		const parsed = JSON.parse(serialized)

		assertEquals(parsed.nodeId, "node1")
		assertEquals(parsed.version, 2)
		assertEquals(parsed.items.length, 2)
	})

	it("should deduplicate items by id during merge", () => {
		const item1 = { value: "test", id: "id1" }
		const item2 = { value: "test", id: "id1", tombstone: true }

		const set1 = createORSet([item1], "node1")
		const set2 = createORSet([item2], "node2")

		const merged = set1.merge(set2)

		// Should keep the tombstoned version
		assertEquals(merged.value.length, 1)
		assertEquals(merged.value[0].tombstone, true)
		assertEquals(merged.values(), [])
	})

	it("should maintain commutativity property", () => {
		const set1 = createORSet([], "node1").add("a")
		const set2 = createORSet([], "node2").add("b")
		const set3 = createORSet([], "node3").add("c")

		const merged1 = set1.merge(set2).merge(set3)
		const merged2 = set3.merge(set2).merge(set1)

		assertEquals(merged1.values().sort(), merged2.values().sort())
	})

	it("should maintain associativity property", () => {
		const set1 = createORSet([], "node1").add("a")
		const set2 = createORSet([], "node2").add("b")
		const set3 = createORSet([], "node3").add("c")

		const merged1 = (set1.merge(set2)).merge(set3)
		const merged2 = set1.merge(set2.merge(set3))

		assertEquals(merged1.values().sort(), merged2.values().sort())
	})

	it("should maintain idempotency property", () => {
		const set = createORSet([], "node1")
			.add("item1")
			.add("item2")

		const merged1 = set.merge(set)
		const merged2 = merged1.merge(set)

		assertEquals(merged1.values().sort(), set.values().sort())
		assertEquals(merged2.values().sort(), set.values().sort())
	})
})

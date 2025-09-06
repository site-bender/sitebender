import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createCounter from "../../../../../libraries/distributed/src/crdt/counter/index.ts"

describe("Counter CRDT", () => {
	it("should create a counter with initial value 0", () => {
		const counter = createCounter("node1")
		assertEquals(counter.getValue(), 0)
		assertEquals(counter.nodeId, "node1")
		assertEquals(counter.version, 0)
	})

	it("should increment the counter", () => {
		const counter = createCounter("node1")
		const incremented = counter.increment()

		assertEquals(incremented.getValue(), 1)
		assertEquals(incremented.version, 1)
		// Original unchanged
		assertEquals(counter.getValue(), 0)
	})

	it("should increment by custom amount", () => {
		const counter = createCounter("node1")
		const incremented = counter.increment(5)

		assertEquals(incremented.getValue(), 5)
	})

	it("should decrement the counter", () => {
		const counter = createCounter("node1")
			.increment(10)
			.decrement(3)

		assertEquals(counter.getValue(), 7)
	})

	it("should handle negative values", () => {
		const counter = createCounter("node1")
			.decrement(5)
			.decrement(3)

		assertEquals(counter.getValue(), -8)
	})

	it("should merge counters correctly", () => {
		const counter1 = createCounter("node1").increment(5)
		const counter2 = createCounter("node2").increment(3)

		const merged1 = counter1.merge(counter2)
		const merged2 = counter2.merge(counter1)

		// Both should converge to sum of all increments
		assertEquals(merged1.getValue(), 8)
		assertEquals(merged2.getValue(), 8)
	})

	it("should handle concurrent increments", () => {
		const base = createCounter("node1")

		// Two nodes increment concurrently from base state
		const node1 = createCounter("node1", base.value, base.version)
			.increment(10)
		const node2 = createCounter("node2", base.value, base.version)
			.increment(20)

		const merged = node1.merge(node2)
		assertEquals(merged.getValue(), 30)
	})

	it("should use max value per node during merge", () => {
		const counts1 = new Map([["node1", 5], ["node2", 3]])
		const counts2 = new Map([["node1", 2], ["node2", 7]])

		const counter1 = createCounter("node1", counts1)
		const counter2 = createCounter("node2", counts2)

		const merged = counter1.merge(counter2)

		// Should take max for each node: node1=5, node2=7
		assertEquals(merged.getValue(), 12)
	})

	it("should serialize to JSON", () => {
		const counter = createCounter("node1")
			.increment(5)
			.increment(3)

		const serialized = counter.serialize()
		const parsed = JSON.parse(serialized)

		assertEquals(parsed.nodeId, "node1")
		assertEquals(parsed.version, 2)
		assertEquals(parsed.counts, [["node1", 8]])
	})

	it("should maintain commutativity property", () => {
		const counter1 = createCounter("node1").increment(5)
		const counter2 = createCounter("node2").increment(3)
		const counter3 = createCounter("node3").increment(7)

		const merged1 = counter1.merge(counter2).merge(counter3)
		const merged2 = counter3.merge(counter1).merge(counter2)

		assertEquals(merged1.getValue(), merged2.getValue())
	})

	it("should maintain associativity property", () => {
		const counter1 = createCounter("node1").increment(5)
		const counter2 = createCounter("node2").increment(3)
		const counter3 = createCounter("node3").increment(7)

		const merged1 = (counter1.merge(counter2)).merge(counter3)
		const merged2 = counter1.merge(counter2.merge(counter3))

		assertEquals(merged1.getValue(), merged2.getValue())
	})

	it("should maintain idempotency property", () => {
		const counter = createCounter("node1").increment(5)

		const merged1 = counter.merge(counter)
		const merged2 = merged1.merge(counter)

		assertEquals(merged1.getValue(), 5)
		assertEquals(merged2.getValue(), 5)
	})

	it("should handle multiple nodes correctly", () => {
		const counts = new Map([
			["node1", 10],
			["node2", 20],
			["node3", 30],
		])

		const counter = createCounter("node1", counts)
		assertEquals(counter.getValue(), 60)

		const incremented = counter.increment(5)
		assertEquals(incremented.getValue(), 65)

		// Check that only node1's count increased
		assertEquals(incremented.value.get("node1"), 15)
		assertEquals(incremented.value.get("node2"), 20)
		assertEquals(incremented.value.get("node3"), 30)
	})
})

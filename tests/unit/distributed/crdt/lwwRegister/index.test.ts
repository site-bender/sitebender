import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createLWWRegister from "../../../../../libraries/distributed/src/crdt/lwwRegister/index.ts"

describe("LWW-Register CRDT", () => {
	it("should create a register with initial value", () => {
		const register = createLWWRegister("initial", "node1")
		assertEquals(register.value, "initial")
		assertEquals(register.nodeId, "node1")
		assertEquals(register.version, 0)
	})

	it("should update value with set operation", () => {
		const register = createLWWRegister("initial", "node1")
		const updated = register.set("updated")

		assertEquals(updated.value, "updated")
		assertEquals(updated.version, 1)
		// Original should be unchanged (immutability)
		assertEquals(register.value, "initial")
	})

	it("should merge with last-write-wins semantics", () => {
		const timestamp1 = Date.now()
		const timestamp2 = timestamp1 + 1000

		const reg1 = createLWWRegister("value1", "node1", timestamp1)
		const reg2 = createLWWRegister("value2", "node2", timestamp2)

		const merged1 = reg1.merge(reg2)
		const merged2 = reg2.merge(reg1)

		// Both should converge to the same value (later timestamp wins)
		assertEquals(merged1.value, "value2")
		assertEquals(merged2.value, "value2")
	})

	it("should use nodeId for tie-breaking when timestamps are equal", () => {
		const timestamp = Date.now()

		const reg1 = createLWWRegister("value1", "node1", timestamp)
		const reg2 = createLWWRegister("value2", "node2", timestamp)

		const merged1 = reg1.merge(reg2)
		const merged2 = reg2.merge(reg1)

		// Both should converge to the same value (higher nodeId wins)
		assertEquals(merged1.value, "value2")
		assertEquals(merged2.value, "value2")
	})

	it("should serialize to JSON", () => {
		const register = createLWWRegister("test", "node1", 1000, 5)
		const serialized = register.serialize()
		const parsed = JSON.parse(serialized)

		assertEquals(parsed.value, "test")
		assertEquals(parsed.nodeId, "node1")
		assertEquals(parsed.timestamp, 1000)
		assertEquals(parsed.version, 5)
	})

	it("should handle different data types", () => {
		const numberReg = createLWWRegister(42, "node1")
		assertEquals(numberReg.value, 42)

		const boolReg = createLWWRegister(true, "node1")
		assertEquals(boolReg.value, true)

		const objectReg = createLWWRegister({ key: "value" }, "node1")
		assertEquals(objectReg.value.key, "value")

		const arrayReg = createLWWRegister([1, 2, 3], "node1")
		assertEquals(arrayReg.value.length, 3)
	})

	it("should maintain commutativity property", () => {
		const reg1 = createLWWRegister("a", "node1", 100)
		const reg2 = createLWWRegister("b", "node2", 200)
		const reg3 = createLWWRegister("c", "node3", 300)

		// (reg1 ∪ reg2) ∪ reg3
		const merged1 = reg1.merge(reg2).merge(reg3)

		// reg1 ∪ (reg2 ∪ reg3)
		const merged2 = reg1.merge(reg2.merge(reg3))

		// Should be the same regardless of merge order
		assertEquals(merged1.value, merged2.value)
		assertEquals(merged1.value, "c") // Latest timestamp wins
	})

	it("should maintain associativity property", () => {
		const reg1 = createLWWRegister("a", "node1", 100)
		const reg2 = createLWWRegister("b", "node2", 200)
		const reg3 = createLWWRegister("c", "node3", 300)

		// Different groupings should produce same result
		const merged1 = (reg1.merge(reg2)).merge(reg3)
		const merged2 = reg1.merge(reg2.merge(reg3))

		assertEquals(merged1.value, merged2.value)
	})

	it("should maintain idempotency property", () => {
		const register = createLWWRegister("value", "node1", 1000)

		// Merging with itself should not change the value
		const merged1 = register.merge(register)
		const merged2 = merged1.merge(register)

		assertEquals(merged1.value, "value")
		assertEquals(merged2.value, "value")
	})
})

import type { Operand } from "@engineTypes/index.ts"

import Constant from "@engineSrc/constructors/injectors/Constant/index.ts"
import Max from "@engineSrc/constructors/operators/Max/index.ts"
import Min from "@engineSrc/constructors/operators/Min/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

const num = (n: number): Operand => Constant("Number")(n)

describe("min/max operators", () => {
	it("Min constructs correct operator shape", () => {
		const op = Min("Number")([num(3), num(1), num(2)])
		assertEquals(op.tag, "Min")
		assertEquals(op.type, "operator")
		assertEquals(op.datatype, "Number")
		assertEquals(op.operands.length, 3)
	})

	it("Max constructs correct operator shape", () => {
		const op = Max("Number")([num(3), num(1), num(2)])
		assertEquals(op.tag, "Max")
		assertEquals(op.type, "operator")
		assertEquals(op.datatype, "Number")
		assertEquals(op.operands.length, 3)
	})
})

import type { Operand } from "@sitebender/engine-types/index.ts"

import Constant from "@sitebender/engine/constructors/injectors/Constant/index.ts"
import Max from "@sitebender/engine/constructors/operators/Max/index.ts"
import Min from "@sitebender/engine/constructors/operators/Min/index.ts"
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

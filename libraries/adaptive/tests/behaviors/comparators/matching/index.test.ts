import type { Operand } from "@adaptiveTypes/index.ts"

import DoesNotMatch from "@adaptiveSrc/constructors/comparators/matching/DoesNotMatch/index.ts"
import Matches from "@adaptiveSrc/constructors/comparators/matching/Matches/index.ts"
import Constant from "@adaptiveSrc/constructors/injectors/Constant/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

const str = (s: string): Operand => Constant("String")(s)

describe("matching comparators", () => {
	it("Matches builds shape with operand/pattern/flags", () => {
		const cmp = Matches(str("abc"))(str("a.c"))("i")
		assertEquals(cmp.tag, "Matches")
		assertEquals(cmp.type, "comparator")
		assertEquals(cmp.datatype, "String")
		assertEquals(cmp.flags, "i")
	})

	it("DoesNotMatch builds shape with operand/pattern/flags", () => {
		const cmp = DoesNotMatch(str("abc"))(str("def"))()
		assertEquals(cmp.tag, "DoesNotMatch")
		assertEquals(cmp.type, "comparator")
		assertEquals(cmp.datatype, "String")
		assertEquals(cmp.flags, undefined)
	})
})

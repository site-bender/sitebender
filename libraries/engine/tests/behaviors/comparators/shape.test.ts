import type { Operand } from "@sitebender/engine-types/index.ts"

import IsBeforeDate from "@sitebender/engine/constructors/comparators/date/IsBeforeDate/index.ts"
import IsShorterThan from "@sitebender/engine/constructors/comparators/length/IsShorterThan/index.ts"
import Constant from "@sitebender/engine/constructors/injectors/Constant/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

const str = (s: string): Operand => Constant("String")(s)
const num = (n: number): Operand => Constant("Number")(n)

// Using Basic operand/test shapes via constructors above

describe("misc comparator shapes", () => {
	it("IsBeforeDate builds correct shape with date datatype", () => {
		const cmp = IsBeforeDate()(str("2020-01-01"))(str("2021-01-01"))
		assertEquals(cmp.tag, "IsBeforeDate")
		assertEquals(cmp.type, "comparator")
		assertEquals(cmp.datatype, "Date")
	})

	it("IsShorterThan builds correct shape for numeric length comparison", () => {
		const cmp = IsShorterThan("Number")(str("abc"))(num(5))
		assertEquals(cmp.tag, "IsShorterThan")
		assertEquals(cmp.type, "comparator")
		assertEquals(cmp.datatype, "Number")
	})
})

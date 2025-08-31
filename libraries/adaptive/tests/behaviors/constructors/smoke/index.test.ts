import type {
	ComparatorConfig,
	FromApiInjector,
	FromLookupInjector,
	FromLookupTableInjector,
	FromQueryStringInjector,
	FromUrlParameterInjector,
	LogicalConfig,
	Operand,
	Value,
} from "@adaptiveTypes/index.ts"

import And from "@adaptiveSrc/constructors/comparators/algebraic/And/index.ts"
import Or from "@adaptiveSrc/constructors/comparators/algebraic/Or/index.ts"
import Constant from "@adaptiveSrc/constructors/injectors/Constant/index.ts"
import FromApi from "@adaptiveSrc/constructors/injectors/FromApi/index.ts"
import FromLookup from "@adaptiveSrc/constructors/injectors/FromLookup/index.ts"
import FromLookupTable from "@adaptiveSrc/constructors/injectors/FromLookupTable/index.ts"
import FromQueryString from "@adaptiveSrc/constructors/injectors/FromQueryString/index.ts"
import FromUrlParameter from "@adaptiveSrc/constructors/injectors/FromUrlParameter/index.ts"
import Average from "@adaptiveSrc/constructors/operators/Average/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

const constant = (value: Value): Operand => {
	const dt = typeof value === "number"
		? "Number"
		: typeof value === "boolean"
		? "Boolean"
		: "String"
	return Constant(dt)(value)
}

const num = (n: number): Operand => Constant("Number")(n)

const eq = (a: Operand, b: Operand): ComparatorConfig =>
	({
		tag: "IsEqualTo",
		type: "comparator",
		datatype: "String",
		operand: a,
		test: b,
	}) as ComparatorConfig

const andNode = (
	children: Array<ComparatorConfig | LogicalConfig>,
): LogicalConfig => ({
	tag: "And",
	type: "logical",
	datatype: "Boolean",
	operands: children,
})

const orNode = (
	children: Array<ComparatorConfig | LogicalConfig>,
): LogicalConfig => ({
	tag: "Or",
	type: "logical",
	datatype: "Boolean",
	operands: children,
})

describe("constructors - smoke", () => {
	it("And and Or return correct shapes", () => {
		const a = eq(constant("x"), constant("x"))
		const b = eq(constant("y"), constant("z"))
		const and = And("Boolean")([a, orNode([a, b])])
		const or = Or("Boolean")([a, andNode([a, b])])

		assertEquals(and.tag, "And")
		assertEquals(and.type, "logical")
		assertEquals(and.datatype, "Boolean")
		assertEquals(and.operands.length, 2)

		assertEquals(or.tag, "Or")
		assertEquals(or.type, "logical")
		assertEquals(or.datatype, "Boolean")
		assertEquals(or.operands.length, 2)
	})

	it("Average returns expected operator shape", () => {
		const avg = Average("Number")([num(2), num(4), num(6)])
		assertEquals(avg.tag, "Average")
		assertEquals(avg.type, "operator")
		assertEquals(avg.datatype, "Number")
		assertEquals(avg.operands.length, 3)
	})

	it("FromLookup constructs config with id and defaultValue", () => {
		const inj: FromLookupInjector = FromLookup("Json")("table1", 1)
		assertEquals(inj.tag, "FromLookup")
		assertEquals(inj.type, "injector")
		assertEquals(inj.datatype, "Json")
		assertEquals(inj.source.class, "lookup")
		assertEquals(inj.source.id, "table1")
		// defaultValue is a Value; here we passed a Constant injector with value 1
		// FromLookupInjector.defaultValue is typed as Value; for this smoke test we just assert it's defined
		assertEquals(inj.defaultValue !== undefined, true)
	})

	it("FromLookupTable constructs config with source and test", () => {
		const testOperand = num(5)
		const inj: FromLookupTableInjector = FromLookupTable("Json")({
			tableName: "prices",
			column: "usd",
			test: testOperand,
		})
		assertEquals(inj.tag, "FromLookupTable")
		assertEquals(inj.type, "injector")
		assertEquals(inj.datatype, "Json")
		assertEquals(inj.source.class, "lookup-table")
		assertEquals(inj.source.name, "prices")
		assertEquals(inj.column, "usd")
		assertEquals(inj.test, testOperand)
	})

	it("FromQueryString constructs with key and defaultValue", () => {
		const inj: FromQueryStringInjector = FromQueryString("String")("page", "1")
		assertEquals(inj.tag, "FromQueryString")
		assertEquals(inj.type, "injector")
		assertEquals(inj.datatype, "String")
		assertEquals(inj.key, "page")
		assertEquals(inj.options?.local, "page")
	})

	it("FromUrlParameter constructs with segment", () => {
		const inj: FromUrlParameterInjector = FromUrlParameter("String")({
			segment: 2,
		})
		assertEquals(inj.tag, "FromUrlParameter")
		assertEquals(inj.type, "injector")
		assertEquals(inj.datatype, "String")
		assertEquals(inj.segment, 2)
	})

	it("FromApi constructs with endpoint and headers", () => {
		const inj: FromApiInjector = FromApi("Json")({
			endpoint: "/api/x",
			method: "GET",
			headers: { A: "B" },
		})
		assertEquals(inj.tag, "FromApi")
		assertEquals(inj.type, "injector")
		assertEquals(inj.datatype, "Json")
		assertEquals(inj.endpoint, "/api/x")
		assertEquals(inj.method, "GET")
		assertEquals(inj.headers!.A, "B")
	})
})

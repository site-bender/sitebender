import { assertEquals, assertExists } from "@std/assert"

import Output from "../../../../../../constructors/elements/flow/forms/Output/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Output should create a basic output element with no attributes or children", () => {
	const output = Output()([])
	assertEquals(output.tag, "Output")
	assertEquals(output.children, [])
	assertExists(output.attributes)
})

Deno.test("Output should create an output element with valid attributes", () => {
	const output = Output({
		id: "calculation-result",
		name: "result",
		for: "input1 input2",
		form: "calculator-form",
	})([])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["id"], "calculation-result")
	assertEquals(output.attributes["name"], "result")
	assertEquals(output.attributes["for"], "input1 input2")
	assertEquals(output.attributes["form"], "calculator-form")
})

Deno.test("Output should filter out invalid attributes", () => {
	const output = Output({
		id: "result",
		href: "invalid-for-output",
		src: "invalid-for-output",
		alt: "invalid-for-output",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["id"], "result")
	assertEquals(output.attributes["href"], undefined)
	assertEquals(output.attributes["src"], undefined)
	assertEquals(output.attributes["alt"], undefined)
	assertEquals((output.attributes as any).invalidAttr, undefined)
})

Deno.test("Output should handle calculator result", () => {
	const output = Output({
		name: "sum",
		for: "num1 num2",
	})([TextNode("42")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["name"], "sum")
	assertEquals(output.attributes["for"], "num1 num2")
	assertEquals(output.children.length, 1)
	assertEquals((output.children[0] as any).tag, "TextNode")
})

Deno.test("Output should handle form validation result", () => {
	const output = Output({
		name: "validation",
		for: "email",
	})([TextNode("Email is valid")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["name"], "validation")
	assertEquals(output.attributes["for"], "email")
})

Deno.test("Output should handle live calculation", () => {
	const children = [
		TextNode("Total: "),
		{ tag: "Strong", attributes: {}, children: [TextNode("$125.50")] },
	]
	const output = Output({
		name: "total",
		for: "price quantity tax",
	})(children)

	assertEquals(output.tag, "Output")
	assertEquals(output.children.length, 2)
	assertEquals((output.children[0] as any).tag, "TextNode")
	assertEquals((output.children[1] as any).tag, "Strong")
})

Deno.test("Output should handle unit conversion result", () => {
	const output = Output({
		name: "celsius",
		for: "fahrenheit",
	})([TextNode("25°C")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["name"], "celsius")
	assertEquals(output.attributes["for"], "fahrenheit")
})

Deno.test("Output should handle form association", () => {
	const output = Output({
		name: "bmi-result",
		for: "weight height",
		form: "health-calculator",
	})([TextNode("BMI: 22.5")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["form"], "health-calculator")
})

Deno.test("Output should handle special properties", () => {
	const output = Output({
		id: "dynamic-output",
		name: "calculation",
		calculation: "outputCalculation",
		dataset: { type: "monetary", currency: "USD" },
		display: "inline",
		scripts: ["output-formatter.js"],
		stylesheets: ["output.css"],
	})([])

	assertEquals(output.tag, "Output")
	assertEquals((output as any).calculation, "outputCalculation")
	assertEquals((output as any).dataset, {
		type: "monetary",
		currency: "USD",
	})
	assertEquals((output as any).display, "inline")
	assertEquals((output as any).scripts, ["output-formatter.js"])
	assertEquals((output as any).stylesheets, ["output.css"])
})

Deno.test("Output should handle ARIA attributes", () => {
	const output = Output({
		id: "accessible-output",
		name: "result",
		aria: {
			label: "Calculation result",
			live: "polite",
		},
	})([])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["aria-label"], "Calculation result")
	assertEquals(output.attributes["aria-live"], "polite")
})

Deno.test("Output should handle formatted numeric result", () => {
	const children = [
		{
			tag: "Span",
			attributes: { class: "currency" },
			children: [TextNode("$")],
		},
		{
			tag: "Span",
			attributes: { class: "amount" },
			children: [TextNode("1,234.56")],
		},
	]
	const output = Output({
		name: "formatted-price",
		for: "base-price discount",
	})(children)

	assertEquals(output.tag, "Output")
	assertEquals(output.children.length, 2)
	assertEquals((output.children[0] as any).tag, "Span")
	assertEquals((output.children[1] as any).tag, "Span")
})

Deno.test("Output should handle error messages", () => {
	const children = [
		{
			tag: "Span",
			attributes: { class: "error-icon" },
			children: [TextNode("⚠")],
		},
		TextNode(" Invalid input"),
	]
	const output = Output({
		name: "error-message",
		for: "user-input",
	})(children)

	assertEquals(output.tag, "Output")
	assertEquals(output.children.length, 2)
})

Deno.test("Output should handle single child (not array)", () => {
	const text = TextNode("Success!")
	const output = Output({ name: "status" })(text)

	assertEquals(output.tag, "Output")
	assertEquals(output.children.length, 1)
	assertEquals(output.children[0], text)
})

Deno.test("Output should handle multiple input references", () => {
	const output = Output({
		name: "shipping-total",
		for: "subtotal tax shipping-cost discount",
	})([TextNode("$98.75")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["for"], "subtotal tax shipping-cost discount")
})

Deno.test("Output should handle missing for attribute", () => {
	const output = Output({
		name: "standalone-result",
	})([TextNode("Result")])

	assertEquals(output.tag, "Output")
	assertEquals(output.attributes["for"], undefined)
	assertEquals(output.attributes["name"], "standalone-result")
})

Deno.test("Output should handle empty children array", () => {
	const output = Output({ id: "empty-output", name: "empty" })([])
	assertEquals(output.tag, "Output")
	assertEquals(output.children, [])
})

import type { DemoResult } from "../types/index.ts"
import createDemo from "../createDemo/index.ts"

// Returns all demo cases for testing the parser
export default function getDemoCases(): ReadonlyArray<DemoResult> {
	return [
		createDemo(
			"Simple arithmetic with constants",
			"3.14 + 2.86",
			{},
		),

		createDemo(
			"Variables with different injector types",
			"(price * quantity) * (1 + tax_rate)",
			{
				price: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Float" as const,
					source: "#price-input",
				},
				quantity: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					source: "#qty-input",
				},
				"tax_rate": {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Float" as const,
					value: 0.08,
				},
			},
		),

		createDemo(
			"Complex formula with mixed operations",
			"(a / b) + (c / d) - e^2",
			{
				a: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 99,
				},
				b: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					source: "#divisor",
				},
				c: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 44,
				},
				d: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 2,
				},
				e: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 3,
				},
			},
		),

		createDemo(
			"Unary operations",
			"-x + y",
			{
				x: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					value: 10,
				},
				y: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					value: 20,
				},
			},
		),

		createDemo(
			"Error handling - undefined variable",
			"a + b",
			{
				a: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					value: 5,
				},
			},
			"Variable b is not defined",
		),

		createDemo(
			"Error handling - syntax error",
			"5 + + 3",
			{},
		),

		createDemo(
			"Type inference",
			"int1 + int2",
			{
				int1: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 10,
				},
				int2: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 20,
				},
			},
			"Both Integer types",
		),

		createDemo(
			"Mixed types default to Number",
			"intVal + floatVal",
			{
				intVal: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					value: 10,
				},
				floatVal: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Float" as const,
					value: 3.14,
				},
			},
		),

		createDemo(
			"Conditional expressions",
			"age >= 18 ? adult_price : child_price",
			{
				age: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Integer" as const,
					source: "#age-input",
				},
				adult_price: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					value: 25.00,
				},
				child_price: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					value: 15.00,
				},
			},
		),

		createDemo(
			"Nested conditional expressions",
			"score >= 90 ? 4 : score >= 80 ? 3 : score >= 70 ? 2 : 1",
			{
				score: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Number" as const,
					source: "#score-input",
				},
			},
			"Grade calculation (would use strings with future string support)",
		),

		createDemo(
			"Complex conditional with calculations",
			"(subtotal > 100) ? (subtotal * 0.9) : (subtotal + shipping)",
			{
				subtotal: {
					tag: "FromElement" as const,
					type: "injector" as const,
					datatype: "Float" as const,
					source: "#subtotal",
				},
				shipping: {
					tag: "Constant" as const,
					type: "injector" as const,
					datatype: "Float" as const,
					value: 9.99,
				},
			},
			"10% discount for orders over $100, otherwise add shipping",
		),
	]
}

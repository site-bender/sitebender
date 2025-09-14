import { assertEquals } from "@std/assert"
import extractGraph from "./index.ts"
import type { BoundariesConfig } from "../types/index.ts"

//++ Tests for extractGraph function

Deno.test("extractGraph", async (t) => {
	await t.step("extracts empty graph", () => {
		const boundaries: BoundariesConfig = { dependencies: {} }
		const result = extractGraph(boundaries)

		assertEquals(result.version, 1)
		assertEquals(result.libraries, [])
		assertEquals(result.edges, [])
	})

	await t.step("extracts single edge", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				parser: {
					canImport: ["toolkit"],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.libraries, ["parser"])
		assertEquals(result.edges.length, 1)
		assertEquals(result.edges[0], { from: "parser", to: "toolkit" })
	})

	await t.step("extracts multiple edges from one library", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				envoy: {
					canImport: ["parser", "toolkit", "foundry"],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.edges.length, 3)
		assertEquals(result.edges[0], { from: "envoy", to: "foundry" })
		assertEquals(result.edges[1], { from: "envoy", to: "parser" })
		assertEquals(result.edges[2], { from: "envoy", to: "toolkit" })
	})

	await t.step("handles missing canImport array", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				mesh: {
					canImport: [],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.libraries, ["mesh"])
		assertEquals(result.edges, [])
	})
})

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
				linguist: {
					canImport: ["toolsmith"],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.libraries, ["linguist"])
		assertEquals(result.edges.length, 1)
		assertEquals(result.edges[0], { from: "linguist", to: "toolsmith" })
	})

	await t.step("extracts multiple edges from one library", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				envoy: {
					canImport: ["linguist", "toolsmith", "quarrier"],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.edges.length, 3)
		assertEquals(result.edges[0], { from: "envoy", to: "quarrier" })
		assertEquals(result.edges[1], { from: "envoy", to: "linguist" })
		assertEquals(result.edges[2], { from: "envoy", to: "toolsmith" })
	})

	await t.step("handles missing canImport array", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				agent: {
					canImport: [],
				},
			},
		}
		const result = extractGraph(boundaries)

		assertEquals(result.libraries, ["agent"])
		assertEquals(result.edges, [])
	})
})

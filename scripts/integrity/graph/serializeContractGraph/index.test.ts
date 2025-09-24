import { assertEquals } from "@std/assert"
import serializeContractGraph from "./index.ts"
import type { BoundariesConfig } from "../types/index.ts"

//++ Tests for serializeContractGraph function

Deno.test("serializeContractGraph", async (t) => {
	await t.step("serializes empty dependencies", () => {
		const boundaries: BoundariesConfig = { dependencies: {} }
		const result = serializeContractGraph(boundaries)
		const parsed = JSON.parse(result)

		assertEquals(parsed.version, 1)
		assertEquals(parsed.libraries, [])
		assertEquals(parsed.edges, [])
	})

	await t.step("serializes single dependency", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				linguist: {
					canImport: ["toolsmith"],
				},
			},
		}
		const result = serializeContractGraph(boundaries)
		const parsed = JSON.parse(result)

		assertEquals(parsed.libraries, ["linguist"])
		assertEquals(parsed.edges, [{ from: "linguist", to: "toolsmith" }])
	})

	await t.step("sorts libraries alphabetically", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				zeta: { canImport: [] },
				alpha: { canImport: [] },
				beta: { canImport: [] },
			},
		}
		const result = serializeContractGraph(boundaries)
		const parsed = JSON.parse(result)

		assertEquals(parsed.libraries, ["alpha", "beta", "zeta"])
	})

	await t.step("sorts edges by from then to", () => {
		const boundaries: BoundariesConfig = {
			dependencies: {
				beta: { canImport: ["zeta", "alpha"] },
				alpha: { canImport: ["beta"] },
			},
		}
		const result = serializeContractGraph(boundaries)
		const parsed = JSON.parse(result)

		assertEquals(parsed.edges, [
			{ from: "alpha", to: "beta" },
			{ from: "beta", to: "alpha" },
			{ from: "beta", to: "zeta" },
		])
	})
})

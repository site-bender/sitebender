//++ Loads library boundary configuration (cached) from contracts/boundaries.json

import type { Boundaries } from "../../types/index.ts"

let cached: Boundaries | null = null

function defaultBoundaries(): Boundaries {
	return {
		dependencies: {
			envoy: {
				canImport: ["arborist", "toolsmith", "quarrier"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"auditor",
					"architect",
					"artificer",
					"formulator",
					"agent",
				],
			},
			arborist: {
				canImport: ["toolsmith", "quarrier"],
				forbiddenImports: [
					"envoy",
					"auditor",
					"architect",
					"artificer",
					"formulator",
					"agent",
				],
			},
			auditor: {
				canImport: ["arborist", "toolsmith", "quarrier"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"envoy",
					"architect",
					"artificer",
					"formulator",
					"agent",
				],
			},
			toolsmith: {
				canImport: [],
				forbiddenImports: ["*"],
			},
			quarrier: {
				canImport: [],
				forbiddenImports: ["*"],
			},
		},
	}
}

export default function loadBoundaries(): Boundaries {
	if (cached) {
		return cached
	}

	try {
		// Resolve absolute path from repo root to contracts/boundaries.json
		const url = new URL(
			"../../../../contracts/boundaries.json",
			import.meta.url,
		)
		const text = Deno.readTextFileSync(url)
		const json = JSON.parse(text)

		// Narrow to Boundaries shape. We only need the dependencies subtree.
		const deps = (json && json.dependencies) ? json.dependencies : {}
		cached = { dependencies: deps } as Boundaries
		return cached
	} catch (_e) {
		// Fallback to safe defaults if file unreadable or malformed
		cached = defaultBoundaries()
		return cached
	}
}

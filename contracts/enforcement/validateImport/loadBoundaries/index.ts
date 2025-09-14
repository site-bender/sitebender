//++ Loads library boundary configuration (cached) from contracts/boundaries.json

import type { Boundaries } from "../../types/index.ts"

let cached: Boundaries | null = null

function defaultBoundaries(): Boundaries {
	return {
		dependencies: {
			envoy: {
				canImport: ["parser", "toolkit", "foundry"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"prover",
					"components",
					"engine",
					"maths",
					"mesh",
				],
			},
			parser: {
				canImport: ["toolkit", "foundry"],
				forbiddenImports: [
					"envoy",
					"prover",
					"components",
					"engine",
					"maths",
					"mesh",
				],
			},
			prover: {
				canImport: ["parser", "toolkit", "foundry"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"envoy",
					"components",
					"engine",
					"maths",
					"mesh",
				],
			},
			toolkit: {
				canImport: [],
				forbiddenImports: ["*"],
			},
			foundry: {
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
		const url = new URL("../../../../contracts/boundaries.json", import.meta.url)
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

//?? [GOTCHA] Uses sync file read at startup; acceptable for small config. Consider async + caching for long-running processes.

//++ Loads library boundary configuration

import type { Boundaries } from "../../types/index.ts"

export default function loadBoundaries(): Boundaries {
	// In production, this would load and cache the boundaries.json file
	// For now, returning a minimal structure
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

//-- [REFACTOR] Should read from boundaries.json file instead of hardcoding
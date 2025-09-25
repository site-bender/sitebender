import {
	basename,
	dirname,
	join,
} from "https://deno.land/std@0.224.0/path/mod.ts"

import { defineLookupCache, SRC_DEFINE_ROOT } from "../constants/index.ts"

//++ Finds component definition files by name using filesystem search
export default async function findDefineComponentByName(
	symbol: string,
): Promise<{ count: number; paths: string[] }> {
	const cached = defineLookupCache.get(symbol)
	if (cached) return cached

	// Search for .../src/define/**/<symbol>/index.tsx
	const allMatches: string[] = []
	const exactParentMatches: string[] = []
	const target = symbol

	async function* walkDir(dir: string): AsyncGenerator<string> {
		//-- [REFACTOR] For-await loop should be replaced with functional approach
		for await (const entry of Deno.readDir(dir)) {
			const p = join(dir, entry.name)
			if (entry.isDirectory) {
				yield* walkDir(p)
			} else if (entry.isFile) {
				if (basename(p) === "index.tsx" && p.includes(`/${target}/`)) {
					allMatches.push(p)
					if (basename(dirname(p)) === target) {
						exactParentMatches.push(p)
					}
				}
			}
		}
	}

	try {
		await (async () => {
			//-- [REFACTOR] For-await loop should be replaced with functional approach
			for await (const _ of walkDir(SRC_DEFINE_ROOT)) { /*noop*/ }
		})()
	} catch (_) {
		// ignore
	}

	let result: { count: number; paths: string[] }
	if (exactParentMatches.length === 1) {
		result = { count: 1, paths: exactParentMatches }
	} else if (exactParentMatches.length > 1) {
		result = { count: exactParentMatches.length, paths: exactParentMatches }
	} else {
		// No exact parent matches; try to pick the shortest path as heuristic if present
		if (allMatches.length === 1) {
			result = { count: 1, paths: allMatches }
		} else if (allMatches.length > 1) {
			const shortest = allMatches.reduce((a, b) => a.length <= b.length ? a : b)
			result = { count: 1, paths: [shortest] }
		} else {
			result = { count: 0, paths: [] }
		}
	}

	defineLookupCache.set(symbol, result)

	return result
}

//?? [GOTCHA] Contains for-await loops that violate FP rules - marked as tech debt
//?? [EXAMPLE]
// const result = await findDefineComponentByName("Person")
// // result.count === 1 && result.paths[0] === "/path/to/Person/index.tsx"

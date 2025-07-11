import { join } from "jsr:@std/path"

import extractComponentImportPaths from "./extractComponentImportPaths/index.ts"

export default function analyzeFileRecursively(componentsRoot: string) {
	const analyze = async (
		filePath: string,
		visited: Set<string> = new Set(),
	): Promise<Array<string>> => {
		if (visited.has(filePath)) {
			return []
		}

		try {
			const content = await Deno.readTextFile(filePath)
			const importPaths = extractComponentImportPaths(content)

			const componentPaths = importPaths.map((importPath: string) =>
				join(componentsRoot, importPath)
			)

			const newVisited = new Set([...visited, filePath])

			const nestedAnalysis = await Promise.all(
				componentPaths.map((componentPath: string) => {
					const componentFile = join(componentPath, "index.tsx")
					return analyze(componentFile, newVisited)
				}),
			)

			return [...componentPaths, ...nestedAnalysis.flat()]
		} catch {
			return []
		}
	}

	return analyze
}

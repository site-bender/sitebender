//++ Builds import graph from a root directory
//++ Walks directory tree recursively, parses each TypeScript file
//++ Extracts imports and resolves paths to build complete import graph
//++ Returns Map of file paths to their imports

import parseImports from "../parseImports/index.ts"
import resolveModulePath from "../resolveModulePath/index.ts"
import walkDirectory from "./_walkDirectory/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ImportGraph, ImportInfo } from "../../types/index.ts"

//++ Build import graph from root directory
//++ Takes a root path and returns a Promise of ImportGraph
//++ ImportGraph is a Map of file paths to their resolved imports
export default function buildGraph(
	rootPath: string,
): Promise<ImportGraph> {
	// Walk directory tree to get all TypeScript files
	return walkDirectory(rootPath).then(function processFiles(files) {
		// For each file, parse imports and resolve paths
		const filePromises = reduce(function accumulateGraphData(
			acc: Promise<Map<string, ReadonlyArray<ImportInfo>>>,
		) {
			return function processFile(
				filePath: string,
			): Promise<Map<string, ReadonlyArray<ImportInfo>>> {
				return acc.then(function addFileToGraph(graphMap) {
					return parseImports(filePath).then(function resolveImportPaths(
						imports: ReadonlyArray<ImportInfo>,
					) {
						// Resolve each import's path
						const resolveForFile = resolveModulePath(filePath)
						const resolvedImportsResult = map(function resolveImport(
							importInfo: ImportInfo,
						) {
							return {
								...importInfo,
								resolved: resolveForFile(importInfo.specifier),
							} as ImportInfo
						})(imports)

						const resolvedImports = getOrElse(
							[] as ReadonlyArray<ImportInfo>,
						)(resolvedImportsResult)

						// Add to graph map
						const newMap = new Map(graphMap)
						newMap.set(filePath, resolvedImports)

						return newMap
					})
				})
			}
		})(Promise.resolve(new Map<string, ReadonlyArray<ImportInfo>>()))(files)

		return getOrElse(
			Promise.resolve(new Map<string, ReadonlyArray<ImportInfo>>()),
		)(filePromises).then(
			function convertToReadonlyMap(
				map: Map<string, ReadonlyArray<ImportInfo>>,
			) {
				// Convert to ReadonlyMap
				return map as ImportGraph
			},
		)
	})
}

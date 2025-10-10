//++ Find all privacy violations in an import graph
//++
//++ This function analyzes an ImportGraph and returns all privacy violations.
//++ A privacy violation occurs when a file imports a private function it shouldn't access.
//++
//++ This is a curried pure function: findViolations(graph) => PrivacyViolation[]
//++
//++ Algorithm:
//++ 1. For each file in the graph
//++ 2. For each import in that file
//++ 3. Check if the import is valid using isValidImport
//++ 4. If invalid, create a PrivacyViolation
//++ 5. Return all violations
//++
//++ Examples:
//++   - Empty graph → []
//++   - Graph with only public imports → []
//++   - Graph with cross-scope private import → [PrivacyViolation]

import type {
	ImportGraph,
	ImportInfo,
	PrivacyViolation,
} from "../../types/index.ts"
import isValidImport from "../isValidImport/index.ts"

//++ Helper: Convert absolute path to relative if it contains "src/"
//++ This normalizes paths for privacy checking since resolveModulePath returns absolute paths
//++ but source paths from parseImports are relative
function toRelativePath(path: string): string {
	// If path contains /src/, extract from src/ onwards
	const srcIndex = path.indexOf("/src/")
	if (srcIndex >= 0) {
		return path.substring(srcIndex + 1) // +1 to skip the leading /
	}
	// Already relative or external module
	return path
}

export default function findViolations(
	importGraph: ImportGraph,
): ReadonlyArray<PrivacyViolation> {
	// Convert graph entries to array for functional processing
	const graphEntries = Array.from(importGraph.entries())

	// For each file, check all its imports
	const allViolations = graphEntries.map(
		function processFileImports(
			entry: [string, ReadonlyArray<ImportInfo>],
		): ReadonlyArray<PrivacyViolation> {
			const [_sourceFile, imports] = entry

			// Check each import for validity
			const fileViolations = imports.map(
				function checkImport(importInfo: ImportInfo): PrivacyViolation | null {
					const { source, resolved, line, column } = importInfo

					// Normalize paths to relative for privacy checking
					const normalizedSource = toRelativePath(source)
					const normalizedResolved = toRelativePath(resolved)

					// Check if this import is valid
					const isValid = isValidImport(normalizedSource)(normalizedResolved)

					if (isValid) {
						return null
					}

					// Create violation
					const violation: PrivacyViolation = {
						type: "privacy",
						fromFile: source,
						toFile: resolved,
						line,
						column,
						message:
							`Cannot import private function '${resolved}' from '${source}'. Private functions can only be imported from within their parent scope.`,
					}

					return violation
				},
			)

			// Filter out nulls (valid imports)
			const violations = fileViolations.filter(
				function isViolation(
					v: PrivacyViolation | null,
				): v is PrivacyViolation {
					return v !== null
				},
			)

			return violations
		},
	)

	// Flatten array of arrays into single array
	const flatViolations = allViolations.reduce(
		function concatViolations(
			acc: ReadonlyArray<PrivacyViolation>,
			violations: ReadonlyArray<PrivacyViolation>,
		): ReadonlyArray<PrivacyViolation> {
			return [...acc, ...violations]
		},
		[],
	)

	return flatViolations
}

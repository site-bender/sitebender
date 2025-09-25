import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type { ImportInfo } from "../../../types/index.ts"

//++ Sorts import statements by category, type, and source with proper grouping and spacing
export default function sortImports(imports: ImportInfo[]): string {
	if (imports.length === 0) return ""

	// Sort all imports by category first, then by type within category, then alphabetically
	const sortedImports = [...imports].sort((a, b) => {
		// First sort by category
		const categoryOrder = [
			"external",
			"types",
			"components",
			"utilities",
			"constants",
			"local",
		]
		const categoryDiff = categoryOrder.indexOf(a.category) -
			categoryOrder.indexOf(b.category)
		if (categoryDiff !== 0) return categoryDiff

		// Within same category, sort by type (type imports before value imports)
		if (a.type !== b.type) {
			return a.type === "type" ? -1 : 1
		}

		// Within same category and type, sort by source
		if (a.source !== b.source) {
			return a.source.localeCompare(b.source)
		}

		// Special sorting for imports from same source
		// Put default imports before named imports
		const aIsDefault = a.text.includes(" from ") && !a.text.includes("{")
		const bIsDefault = b.text.includes(" from ") && !b.text.includes("{")

		if (aIsDefault && !bIsDefault) return -1
		if (!aIsDefault && bIsDefault) return 1

		return a.text.localeCompare(b.text)
	})

	// Group by category and type combination for spacing using reduce
	type ImportGroup = {
		category: string
		type: string
		imports: ImportInfo[]
	}

	const groups = reduce<ImportInfo, ImportGroup[]>(
		(acc, imp) => {
			const lastGroup = acc[acc.length - 1]
			const needsNewGroup = !lastGroup ||
				lastGroup.category !== imp.category ||
				lastGroup.type !== imp.type

			if (needsNewGroup) {
				return [...acc, {
					category: imp.category,
					type: imp.type,
					imports: [imp],
				}]
			}

			// Add to existing group immutably
			return [
				...acc.slice(0, -1),
				{
					...lastGroup,
					imports: [...lastGroup.imports, imp],
				},
			]
		},
	)([])(sortedImports)

	// Build output with proper spacing between groups using flatMap
	const output = flatMap<ImportGroup, string>(
		(group, index) => {
			const groupTexts = map((imp: ImportInfo) => imp.text)(group.imports)
			return index > 0
				? ["", ...groupTexts] // Add blank line before group
				: groupTexts
		},
	)(groups)

	return output.join("\n")
}

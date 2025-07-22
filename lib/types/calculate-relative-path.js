function calculateRelativePath(fromLocation, toLocation) {
	// Get the current type's directory (keep the TypeName part)
	const fromPath = fromLocation.replace(/\/index\.ts$/, "")
	// Get the target directory (remove TypeName/index.ts)
	const toPath = toLocation.replace(/\/[^/]+\/index\.ts$/, "")

	const fromSegments = fromPath.split("/")
	const toSegments = toPath.split("/")

	// Find common prefix
	let commonLength = 0
	for (let i = 0; i < Math.min(fromSegments.length, toSegments.length); i++) {
		if (fromSegments[i] === toSegments[i]) {
			commonLength++
		} else {
			break
		}
	}

	// Check if it's a direct ancestor (target path is prefix of current path)
	const isDirectAncestor = commonLength === toSegments.length &&
		fromSegments.length > toSegments.length

	if (isDirectAncestor) {
		// Direct ancestor - just go up the right number of levels
		const levelsUp = fromSegments.length - toSegments.length
		return "../".repeat(levelsUp) + "index.ts"
	} else {
		// Not direct ancestor - go up to common prefix, then down to target
		const upLevels = fromSegments.length - commonLength
		const downSegments = toSegments.slice(commonLength)

		let relativePath = "../".repeat(upLevels)
		if (downSegments.length > 0) {
			relativePath += downSegments.join("/") + "/"
		}
		relativePath += "index.ts"

		return relativePath
	}
}

function generateImports(typeList) {
	for (const [typeName, typeData] of Object.entries(typeList)) {
		if (typeData.inheritsFrom && typeof typeData.inheritsFrom === "object") {
			const newImports = [...typeData.imports] // Keep existing imports (Thing)

			for (
				const [ancestorType, ancestorLocation] of Object.entries(
					typeData.inheritsFrom,
				)
			) {
				const relativePath = calculateRelativePath(
					typeData.location,
					ancestorLocation,
				)
				newImports.push(
					`import type { ${ancestorType}Props } from "${relativePath}"`,
				)
			}

			// Sort: Thing first, then alphabetical
			newImports.sort((a, b) => {
				if (a.includes("Thing from")) return -1
				if (b.includes("Thing from")) return 1
				return a.localeCompare(b)
			})

			typeData.imports = newImports
		}
	}
	return typeList
}

// Read the input file
const typeList = JSON.parse(Deno.readTextFileSync("paths-final-almost.json"))

// Generate imports
const updatedTypeList = generateImports(typeList)

// Write the output file
Deno.writeTextFileSync(
	"paths-nearly-there.json",
	JSON.stringify(updatedTypeList, null, 2),
)

console.log(
	"Import generation complete. Output written to paths-nearly-there.json",
)

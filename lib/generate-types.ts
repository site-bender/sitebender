#!/usr/bin/env -S deno run --allow-read --allow-write

async function generateTypeFiles(): Promise<void> {
	const pathsContent = await Deno.readTextFile("./inheritance-paths.txt")
	const paths = pathsContent.trim().split("\n")

	// Parse all inheritance paths
	const typeToPath = new Map<string, string[][]>()

	for (const path of paths) {
		const parts = path.split(" < ")
		const typeName = parts[0]

		if (!typeToPath.has(typeName)) {
			typeToPath.set(typeName, [])
		}
		typeToPath.get(typeName)!.push(parts)
	}

	// For each type, determine all Props it needs and optimal import paths
	const typeToPropsAndImports = new Map<string, {
		propsNeeded: Set<string>
		importPaths: Map<string, string>
	}>()

	for (const [typeName, inheritancePaths] of typeToPath) {
		const propsNeeded = new Set<string>()
		const importPaths = new Map<string, string>()

		// Collect all Props from all inheritance paths
		for (const path of inheritancePaths) {
			for (let i = 0; i < path.length - 1; i++) { // -1 to exclude Thing
				const propType = path[i]
				if (propType !== typeName) { // Don't include self
					propsNeeded.add(propType + "Props")

					// Determine import path for this Props type
					const importPath = determineOptimalImportPath(
						propType,
						typeName,
						typeToPath,
					)
					if (!importPaths.has(propType + "Props")) {
						importPaths.set(propType + "Props", importPath)
					}
				}
			}
		}

		typeToPropsAndImports.set(typeName, { propsNeeded, importPaths })
	}

	// Generate files for each type
	for (
		const [typeName, { propsNeeded, importPaths }] of typeToPropsAndImports
	) {
		await generateTypeFile(
			typeName,
			propsNeeded,
			importPaths,
			typeToPath.get(typeName)![0],
		)
	}

	console.log(`Generated ${typeToPropsAndImports.size} type files`)
}

function determineOptimalImportPath(
	propType: string,
	currentType: string,
	typeToPath: Map<string, string[][]>,
): string {
	const paths = typeToPath.get(propType)
	if (!paths || paths.length === 0) {
		throw new Error(`No paths found for ${propType}`)
	}

	// Find shortest path, then alphabetically first if tied
	let bestPath = paths[0]
	for (const path of paths) {
		if (
			path.length < bestPath.length ||
			(path.length === bestPath.length && path.join("/") < bestPath.join("/"))
		) {
			bestPath = path
		}
	}

	// Convert to relative import path from current type's location
	const currentPath = typeToPath.get(currentType)![0]
	return buildRelativeImportPath(bestPath, currentPath)
}

function buildRelativeImportPath(
	targetPath: string[],
	currentPath: string[],
): string {
	// Remove 'Thing' from both paths and build relative path
	const targetDirs = targetPath.slice(1, -1) // Remove Thing and the type itself
	const currentDirs = currentPath.slice(1, -1)

	// Calculate relative path
	const upLevels = currentDirs.length
	const relativePath = "../".repeat(upLevels) + targetDirs.join("/") +
		"/index.ts"

	return relativePath
}

async function generateTypeFile(
	typeName: string,
	propsNeeded: Set<string>,
	importPaths: Map<string, string>,
	primaryPath: string[],
): Promise<void> {
	const dirs = primaryPath.slice(1, -1) // Remove Thing and typeName
	const dirPath = dirs.join("/")
	const fullPath = dirPath ? `${dirPath}/${typeName}` : typeName

	// Create directory structure
	// await Deno.mkdir(fullPath, { recursive: true })

	// Generate TypeScript content
	let content = ""

	// Import Thing
	const thingImportPath = "../".repeat(dirs.length + 1) + "index.ts"
	content += `import type Thing from "${thingImportPath}"\n`

	// Import all Props
	const sortedProps = Array.from(propsNeeded).sort()
	for (const prop of sortedProps) {
		const importPath = importPaths.get(prop)
		if (importPath) {
			const propName = prop.replace("Props", "")
			content += `import type { ${prop} } from "${importPath}"\n`
		}
	}

	content += "\n"

	// Define Props interface
	content += `export interface ${typeName}Props {\n`
	content += `  // ${typeName}-specific properties\n`
	content += `}\n\n`

	// Define intersection type
	const allTypes = ["Thing", ...sortedProps, `${typeName}Props`]
	content += `type ${typeName} = ${allTypes.join(" & ")}\n\n`
	content += `export default ${typeName}\n`

	if (typeName === "CreativeWork") {
		console.log(">>>>>", typeName, ">>>>>")
		console.log(content)
		console.log()
	}

	// Write file
	// await Deno.writeTextFile(`${fullPath}/index.ts`, content)
}

if (import.meta.main) {
	await generateTypeFiles()
}

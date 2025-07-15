#!/usr/bin/env -S deno run --allow-read --allow-write

import { walk } from "jsr:@std/fs/walk"
import { basename, dirname, join, relative } from "jsr:@std/path"
import { ensureDir, exists } from "jsr:@std/fs"

const TYPES_BASE = "lib/types/Thing"
const COMPONENTS_BASE = "lib/components/Thing"

interface ComponentInfo {
	typePath: string
	componentPath: string
	typeName: string
	parentTypeName: string | null
	parentComponentPath: string | null
	isReExport: boolean
	properties: string[]
}

async function parseInterfaceProperties(
	filePath: string,
): Promise<{ isReExport: boolean; properties: string[] }> {
	try {
		const content = await Deno.readTextFile(filePath)

		// Check if it's a re-export
		if (content.includes("export { default }")) {
			return { isReExport: true, properties: [] }
		}

		// Find the interface definition
		const interfaceMatch = content.match(
			/export default interface \w+ extends \w+ \{([\s\S]*?)\n\}/s,
		)
		if (!interfaceMatch) {
			return { isReExport: false, properties: [] }
		}

		const interfaceBody = interfaceMatch[1]
		const properties: string[] = []

		// Parse each property line
		const lines = interfaceBody.split("\n")
		for (const line of lines) {
			const trimmed = line.trim()

			// Skip empty lines and comments
			if (
				!trimmed || trimmed.startsWith("//") || trimmed.startsWith("/*") ||
				trimmed.startsWith("*")
			) {
				continue
			}

			// Extract property name (handle optional properties with ?)
			const propertyMatch = trimmed.match(/^(\w+)\??:/)
			if (propertyMatch) {
				properties.push(propertyMatch[1])
			}
		}

		return { isReExport: false, properties }
	} catch (error) {
		console.error(`Error parsing ${filePath}:`, error)
		return { isReExport: false, properties: [] }
	}
}

function getRelativeImportPath(fromPath: string, toPath: string): string {
	const relativePath = relative(dirname(fromPath), toPath)
	return relativePath.startsWith(".") ? relativePath : `./${relativePath}`
}

function getTypeImportPath(componentPath: string, typeName: string): string {
	// Calculate how many levels up to get to lib/types/Thing
	const levels = componentPath.split("/").length - 2 // -2 for 'lib/components'
	const prefix = "../".repeat(levels)
	return `${prefix}types/Thing/${typeName}/index.ts`
}

function getParentTypeImportPath(
	componentPath: string,
	parentTypeName: string,
): string {
	const levels = componentPath.split("/").length - 2
	const prefix = "../".repeat(levels)
	return `${prefix}types/Thing/${parentTypeName}/index.ts`
}

function generateComponent(info: ComponentInfo): string {
	const {
		typeName,
		parentTypeName,
		parentComponentPath,
		isReExport,
		properties,
	} = info

	if (isReExport && parentComponentPath) {
		// Generate simple re-export for dual paths like Place/LocalBusiness
		const importPath = getRelativeImportPath(
			info.componentPath,
			parentComponentPath,
		)
		return `import ${typeName} from "${importPath}"

export default ${typeName}
`
	}

	if (!parentComponentPath || !parentTypeName) {
		throw new Error(`Missing parent info for ${typeName}`)
	}

	const parentImportPath = getRelativeImportPath(
		info.componentPath,
		parentComponentPath,
	)
	const typesImportPath = getTypeImportPath(info.componentPath, typeName)
	const parentTypesImportPath = getParentTypeImportPath(
		info.componentPath,
		parentTypeName,
	)
	const baseTypesImportPath = getTypeImportPath(info.componentPath, "").replace(
		"/index.ts",
		"../index.ts",
	)

	if (properties.length === 0) {
		// Generate simple pass-through component for types that add no properties
		return `import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "${baseTypesImportPath}"
import type ${typeName}Props from "${typesImportPath}"
import type ${parentTypeName}Props from "${parentTypesImportPath}"

import ${parentTypeName} from "${parentImportPath}"

// ${typeName} adds no properties to the ${parentTypeName} schema type
export type Props = BaseComponentProps<
	${typeName}Props,
	"${typeName}",
	ExtractLevelProps<${typeName}Props, ${parentTypeName}Props>
>

export default function ${typeName}({
	schemaType = "${typeName}",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<${parentTypeName}
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
`
	}

	// Generate component with properties
	const propsDestructuring = properties.join(",\n\t\t")
	const subtypePropsObject = properties.map((prop) => `\t\t${prop},`).join("\n")

	return `import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "${baseTypesImportPath}"
import type ${typeName}Props from "${typesImportPath}"
import type ${parentTypeName}Props from "${parentTypesImportPath}"

import ${parentTypeName} from "${parentImportPath}"

export type Props = BaseComponentProps<
	${typeName}Props,
	"${typeName}",
	ExtractLevelProps<${typeName}Props, ${parentTypeName}Props>
>

export default function ${typeName}(
	{
		${propsDestructuring},
		schemaType = "${typeName}",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<${parentTypeName}
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
${subtypePropsObject}
				...subtypeProperties,
			}}
		/>
	)
}
`
}

async function generateComponents() {
	console.log("🚀 Generating Schema.org components...")

	const componentInfos: ComponentInfo[] = []

	// First pass: collect all component info
	for await (
		const entry of walk(TYPES_BASE, { includeFiles: true, includeDirs: false })
	) {
		if (!entry.name.endsWith("index.ts")) continue

		const relativePath = relative(TYPES_BASE, entry.path)
		const typePath = dirname(relativePath) || "."
		const componentPath = join(COMPONENTS_BASE, typePath)

		// Skip the base Thing type
		if (typePath === ".") continue

		const typeName = basename(dirname(entry.path))
		const parentTypePath = dirname(typePath)
		const parentTypeName = parentTypePath === "."
			? "Thing"
			: basename(parentTypePath)
		const parentComponentPath = parentTypePath === "."
			? join(COMPONENTS_BASE, "index.tsx")
			: join(COMPONENTS_BASE, parentTypePath, "index.tsx")

		const { isReExport, properties } = await parseInterfaceProperties(
			entry.path,
		)

		componentInfos.push({
			typePath,
			componentPath,
			typeName,
			parentTypeName,
			parentComponentPath,
			isReExport,
			properties,
		})
	}

	// Second pass: create folders and generate components
	let created = 0
	let skipped = 0
	let updated = 0

	for (const info of componentInfos) {
		const componentFile = join(info.componentPath, "index.tsx")

		// Skip if component already exists
		if (await exists(componentFile)) {
			console.log(`⏭️  Skipping existing: ${info.typeName}`)
			skipped++
			continue
		}

		// Ensure directory exists
		await ensureDir(info.componentPath)

		// Generate component
		const componentCode = generateComponent(info)
		await Deno.writeTextFile(componentFile, componentCode)

		if (info.properties.length > 0) {
			console.log(
				`✅ Created: ${info.typeName} (${info.properties.length} properties)`,
			)
		} else {
			console.log(`✅ Created: ${info.typeName} (pass-through)`)
		}
		created++
	}

	console.log(`\n🎉 Generation complete!`)
	console.log(`   Created: ${created} components`)
	console.log(`   Skipped: ${skipped} existing components`)
	console.log(`   Updated: ${updated} components`)
}

if (import.meta.main) {
	await generateComponents()
}

#!/usr/bin/env deno run --allow-read

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts"
import { dirname, relative } from "https://deno.land/std@0.208.0/path/mod.ts"

interface TypeInfo {
	filePath: string
	typeName: string
	extendsType: string
	hasOwnProperties: boolean
	currentContent: string
}

async function parseTypeFile(filePath: string): Promise<TypeInfo | null> {
	try {
		const content = await Deno.readTextFile(filePath)

		// Check if this is a re-export file
		if (
			content.trim().startsWith("export type { default }") ||
			content.trim().startsWith("export { default }")
		) {
			return null // Skip re-export files
		}

		// Look for pattern: export default interface X extends Y {
		const interfaceMatch = content.match(
			/export default interface (\w+) extends (\w+) \{/,
		)
		if (!interfaceMatch) return null

		const typeName = interfaceMatch[1]
		const extendsType = interfaceMatch[2]

		// Check if interface has its own properties (non-empty body)
		const interfaceBody = content.substring(
			content.indexOf("{") + 1,
			content.lastIndexOf("}"),
		)
		const hasOwnProperties = interfaceBody.trim().length > 20 // More than just comments/whitespace

		return {
			filePath,
			typeName,
			extendsType,
			hasOwnProperties,
			currentContent: content,
		}
	} catch (error) {
		console.error(
			`❗ Error parsing ${filePath}:`,
			error instanceof Error ? error.message : String(error),
		)
		return null
	}
}

function generateTransformedContent(typeInfo: TypeInfo): string {
	const content = typeInfo.currentContent

	// Find the interface declaration line
	const interfaceMatch = content.match(
		/export default interface (\w+) extends (\w+) \{/,
	)
	if (!interfaceMatch) {
		throw new Error(
			`Could not find interface declaration in ${typeInfo.typeName}`,
		)
	}

	const interfaceStartPos = content.indexOf(interfaceMatch[0])

	// Split content into: [before interface] + [interface body] + [after interface]
	const beforeInterface = content.substring(0, interfaceStartPos).trim()

	// Find the matching closing brace for the interface
	let braceCount = 0
	let interfaceEndPos = -1
	let inInterface = false

	for (let i = interfaceStartPos; i < content.length; i++) {
		if (content[i] === "{") {
			braceCount++
			inInterface = true
		} else if (content[i] === "}") {
			braceCount--
			if (inInterface && braceCount === 0) {
				interfaceEndPos = i
				break
			}
		}
	}

	if (interfaceEndPos === -1) {
		throw new Error(`Could not find end of interface in ${typeInfo.typeName}`)
	}

	// Extract interface body (everything between the braces)
	const interfaceBodyStart = content.indexOf("{", interfaceStartPos) + 1
	const interfaceBody = content.substring(interfaceBodyStart, interfaceEndPos)
		.trim()

	// Build new content
	let result = ""

	// 1. Keep all existing imports exactly as they are
	result += beforeInterface
	result += "\n\n"

	// 2. Generate Props interface
	result += `export interface ${typeInfo.typeName}Props {\n`
	if (interfaceBody.trim()) {
		result += interfaceBody + "\n"
	} else {
		result += `\t// Properties specific to ${typeInfo.typeName}\n`
	}
	result += "}\n\n"

	// 3. Generate type composition
	result += `type ${typeInfo.typeName} =\n`
	result += "\t& Thing\n"
	result += `\t& ${typeInfo.typeName}Props\n\n`

	result += `export default ${typeInfo.typeName}\n`

	return result
}

async function testTransformation(): Promise<void> {
	console.log(
		"🧪 Testing transformation on Event (complex multi-line imports)...",
	)

	const eventFile = "lib/types/Thing/Event/index.ts"
	const typeInfo = await parseTypeFile(eventFile)

	if (!typeInfo) {
		console.log("❌ Could not parse Event file")
		return
	}

	console.log(`✅ Found Event interface: ${typeInfo.typeName}`)
	console.log(`📄 Original content preview (first 10 lines):`)
	console.log("─".repeat(80))
	const originalLines = typeInfo.currentContent.split("\n")
	originalLines.slice(0, 10).forEach((line, i) => {
		console.log(`${String(i + 1).padStart(2, " ")}: ${line}`)
	})
	console.log("─".repeat(80))

	try {
		const transformed = generateTransformedContent(typeInfo)
		console.log(`\n✅ Transformation successful!`)
		console.log(`📄 Transformed content:`)
		console.log("═".repeat(80))
		console.log(transformed)
		console.log("═".repeat(80))
	} catch (error) {
		console.log(
			`❌ Transformation failed: ${
				error instanceof Error ? error.message : String(error)
			}`,
		)
	}
}

if (import.meta.main) {
	await testTransformation()
}

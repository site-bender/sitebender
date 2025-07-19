#!/usr/bin/env deno run --allow-read --allow-write

/**
 * Script to test transformation on Table ONLY
 */

import { dirname, relative } from "https://deno.land/std@0.208.0/path/mod.ts"

interface TypeInfo {
	filePath: string
	typeName: string
	extendsType: string
	currentContent: string
}

async function parseTypeFile(filePath: string): Promise<TypeInfo | null> {
	try {
		const content = await Deno.readTextFile(filePath)

		// Look for pattern: export default interface X extends Y {
		const interfaceMatch = content.match(
			/export default interface (\w+) extends (\w+) \{/,
		)
		if (!interfaceMatch) return null

		const typeName = interfaceMatch[1]
		const extendsType = interfaceMatch[2]

		return {
			filePath,
			typeName,
			extendsType,
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

	// Split content into: [before interface] + [interface body]
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

async function testTableTransformation(): Promise<void> {
	const tableFile = "lib/types/Thing/CreativeWork/WebPageElement/Table/index.ts"

	console.log("🎯 Testing transformation on Table ONLY")
	console.log(`📁 File: ${tableFile}`)
	console.log("")

	// Parse the file
	const typeInfo = await parseTypeFile(tableFile)

	if (!typeInfo) {
		console.log("❌ Could not parse Table file")
		return
	}

	console.log(
		`✅ Found interface: ${typeInfo.typeName} extends ${typeInfo.extendsType}`,
	)
	console.log("")

	// Show original content
	console.log("📄 ORIGINAL CONTENT:")
	console.log("─".repeat(80))
	const originalLines = typeInfo.currentContent.split("\n")
	originalLines.forEach((line, i) => {
		console.log(`${String(i + 1).padStart(3, " ")}: ${line}`)
	})
	console.log("─".repeat(80))
	console.log("")

	// Transform
	try {
		const transformed = generateTransformedContent(typeInfo)
		console.log("✅ TRANSFORMATION SUCCESSFUL!")
		console.log("")
		console.log("📄 TRANSFORMED CONTENT:")
		console.log("═".repeat(80))
		console.log(transformed)
		console.log("═".repeat(80))
		console.log("")

		// Ask for confirmation before writing
		console.log("🤔 This looks correct? Write to file? (You need to confirm)")
		console.log(
			"   To write: deno run --allow-read --allow-write lib/test-table.ts --write",
		)

		if (Deno.args.includes("--write")) {
			await Deno.writeTextFile(tableFile, transformed)
			console.log("💾 File written successfully!")
		}
	} catch (error) {
		console.log(
			`❌ TRANSFORMATION FAILED: ${
				error instanceof Error ? error.message : String(error)
			}`,
		)
	}
}

if (import.meta.main) {
	await testTableTransformation()
}

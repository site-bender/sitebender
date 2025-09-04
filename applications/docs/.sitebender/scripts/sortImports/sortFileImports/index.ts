import extractImports from "./extractImports/index.ts"
import sortImports from "./sortImports/index.ts"

export default async function sortFileImports(filePath: string) {
	try {
		const content = await Deno.readTextFile(filePath)
		const { imports, restOfFile } = extractImports(content)

		if (imports.length === 0) return

		const sortedImportSection = sortImports(imports)

		// Add proper spacing: imports + double newline + rest of file
		const newContent = restOfFile.trim() === ""
			? sortedImportSection + "\n"
			: sortedImportSection + "\n\n" + restOfFile

		await Deno.writeTextFile(filePath, newContent)
		console.log(`✅ Sorted imports in ${filePath}`)
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error)
	}
}

import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"

class ErrorFixer {
	constructor(private basePath: string) {}

	async fixAllErrors(): Promise<void> {
		console.log("🔧 Fixing remaining TypeScript errors...")

		// Fix export type errors
		await this.fixExportTypeErrors()

		// Fix missing default exports in index.ts
		await this.fixIndexDefaultExports()

		// Fix JSX namespace issue
		await this.fixJSXNamespace()

		// Fix named export issues
		await this.fixNamedExportIssues()

		console.log("✅ All fixes applied!")
	}

	private async fixExportTypeErrors(): Promise<void> {
		console.log(
			"🔧 Converting export { default } to export type { default }...",
		)

		for await (
			const entry of walk(`${this.basePath}/lib/types`, {
				exts: [".ts"],
				skip: [/node_modules/, /\.git/],
			})
		) {
			const content = await Deno.readTextFile(entry.path)

			if (content.includes("export { default }")) {
				const newContent = content.replace(
					/export { default }/g,
					"export type { default }",
				)

				if (newContent !== content) {
					await Deno.writeTextFile(entry.path, newContent)
					console.log(`  ✅ Fixed export in ${entry.path}`)
				}
			}
		}
	}

	private async fixIndexDefaultExports(): Promise<void> {
		console.log("🔧 Adding default exports to index.ts files...")

		// Fix main index.ts
		const mainIndexPath = `${this.basePath}/lib/types/index.ts`
		const mainContent = await Deno.readTextFile(mainIndexPath)

		if (
			!mainContent.includes("export { default }") &&
			!mainContent.includes("export default")
		) {
			const newContent = mainContent +
				'\n\nexport { default } from "./Thing/index.ts"\n'
			await Deno.writeTextFile(mainIndexPath, newContent)
			console.log(`  ✅ Fixed main index.ts`)
		}
	}

	private async fixJSXNamespace(): Promise<void> {
		console.log("🔧 Fixing JSX namespace issue...")

		const jsxIndexPath = `${this.basePath}/lib/types/JSX/index.ts`
		const content = await Deno.readTextFile(jsxIndexPath)

		if (!content.includes("declare global")) {
			const jsxNamespace = `
declare global {
  namespace JSX {
    interface Element {
      type: string
      props: any
      children?: any
    }
  }
}

export {};
`
			const newContent = jsxNamespace + "\n" + content
			await Deno.writeTextFile(jsxIndexPath, newContent)
			console.log(`  ✅ Fixed JSX namespace`)
		}
	}

	private async fixNamedExportIssues(): Promise<void> {
		console.log("🔧 Fixing named export issues...")

		const problematicFiles = [
			"lib/types/Thing/Intangible/PaymentMethod/index.ts",
			"lib/types/Thing/Intangible/Service/FinancialProduct/index.ts",
			"lib/types/Thing/MedicalEntity/Substance/index.ts",
		]

		for (const filePath of problematicFiles) {
			const fullPath = `${this.basePath}/${filePath}`
			try {
				const content = await Deno.readTextFile(fullPath)

				// Fix imports that should be type imports
				const newContent = content.replace(
					/import\s+type\s+{\s*(\w+Props)\s*}\s+from/g,
					"import type $1 from",
				)

				if (newContent !== content) {
					await Deno.writeTextFile(fullPath, newContent)
					console.log(`  ✅ Fixed named export in ${filePath}`)
				}
			} catch (error) {
				console.warn(`  ⚠️  Could not fix ${filePath}: ${error.message}`)
			}
		}
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new ErrorFixer(workspacePath)

	try {
		await fixer.fixAllErrors()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

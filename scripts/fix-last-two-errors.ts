class LastTwoErrorsFixer {
	constructor(private basePath: string) {}

	async fixLastErrors(): Promise<void> {
		console.log("🔧 Fixing the last two TypeScript errors...")

		const jsxAttributesPath =
			`${this.basePath}/lib/types/JSX/attributes/index.ts`
		let content = await Deno.readTextFile(jsxAttributesPath)

		// Fix the actual usage in the intrinsic elements interface
		content = content.replace(
			"fieldset: FieldsetAttributes",
			"fieldset: FieldSetAttributes",
		)

		content = content.replace(
			"textarea: TextareaAttributes",
			"textarea: TextAreaAttributes",
		)

		await Deno.writeTextFile(jsxAttributesPath, content)
		console.log("✅ Fixed fieldset and textarea attribute references")
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new LastTwoErrorsFixer(workspacePath)

	try {
		await fixer.fixLastErrors()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

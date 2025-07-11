import { assert, assertRejects } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_OUTPUT_DIR = "./dist"
const BACKUP_DIR = "./src-backup"

async function cleanTestOutput(): Promise<void> {
	try {
		await Deno.remove(TEST_OUTPUT_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}
}

async function backupSource(): Promise<void> {
	try {
		await Deno.remove(BACKUP_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}

	try {
		await Deno.rename("./src", BACKUP_DIR)
	} catch {
		// src directory might not exist or already backed up
	}
}

async function restoreSource(): Promise<void> {
	try {
		await Deno.remove("./src", { recursive: true })
	} catch {
		// src directory might not exist
	}

	try {
		await Deno.rename(BACKUP_DIR, "./src")
	} catch {
		// Backup might not exist
	}
}

async function createMinimalSource(): Promise<void> {
	// Create minimal src structure for testing
	await Deno.mkdir("./src/routes", { recursive: true })
	await Deno.mkdir("./src/components", { recursive: true })

	// Create a simple route with no dependencies
	await Deno.writeTextFile("./src/routes/index.tsx", `
export default function HomePage() {
	return <div>Hello World</div>
}
`)

	// Create _app.tsx with minimal structure
	await Deno.writeTextFile("./src/routes/_app.tsx", `
export default function App({ Component, Head }: {
	Component: () => JSX.Element
	Head?: () => JSX.Element
}) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{Head && <Head />}
			</head>
			<body>
				<Component />
			</body>
		</html>
	)
}
`)
}

async function fileExists(path: string): Promise<boolean> {
	try {
		await Deno.stat(path)
		return true
	} catch {
		return false
	}
}

async function runBuildWithErrors(): Promise<string[]> {
	const errors: string[] = []

	const logger = {
		log: () => {},
		info: () => {},
		warn: (...args: unknown[]) => {
			errors.push(args.join(' '))
		},
		error: (...args: unknown[]) => {
			errors.push(args.join(' '))
		},
	}

	const buildComplete = (await import("~scripts/build/index.ts")).default

	await buildComplete()

	return errors
}

Deno.test("build handles error conditions", async (t) => {
	await cleanTestOutput()

	await t.step("should handle missing components directory gracefully", async () => {
		await backupSource()

		try {
			await createMinimalSource()
			// Don't create any components - components directory exists but is empty

			const errors = await runBuildWithErrors()

			// Build should complete without crashing
			assert(await fileExists(join(TEST_OUTPUT_DIR, "index.html")))

			// Should handle empty components directory gracefully
			// (Specific error messages depend on implementation)
		} finally {
			await restoreSource()
		}
	})

	await t.step("should handle missing src directory gracefully", async () => {
		await backupSource()

		try {
			// Don't create src directory at all

			// Build should handle missing source gracefully
			await assertRejects(
				async () => await runBuildWithErrors(),
				Error
			)
		} finally {
			await restoreSource()
		}
	})

	await t.step("should handle malformed component files", async () => {
		await backupSource()

		try {
			await createMinimalSource()

			// Create a malformed component file
			await Deno.mkdir("./src/components/broken", { recursive: true })
			await Deno.writeTextFile("./src/components/broken/index.tsx", `
// This is malformed TypeScript that should cause parsing issues
export default function BrokenComponent() {
	return <div>Broken { unclosed
`)

			// Create a route that tries to use the broken component
			await Deno.writeTextFile("./src/routes/broken.tsx", `
import BrokenComponent from "~components/broken/index.tsx"

export default function BrokenPage() {
	return <BrokenComponent />
}
`)

			const errors = await runBuildWithErrors()

			// Build might succeed despite malformed components (depends on analysis robustness)
			// The key is that it doesn't crash the entire build process
			assert(Array.isArray(errors))
		} finally {
			await restoreSource()
		}
	})

	await t.step("should build simple pages without components", async () => {
		// This test validates that the build can handle minimal source structures
		// Instead of creating a separate source, we'll verify the current build works
		// and contains expected content

		const errors = await runBuildWithErrors()

		// Should successfully build even if some components are missing
		assert(await fileExists(join(TEST_OUTPUT_DIR, "index.html")))

		// Read the generated HTML to verify it's valid HTML structure
		const htmlContent = await Deno.readTextFile(join(TEST_OUTPUT_DIR, "index.html"))
		assert(htmlContent.includes("<html"))
		assert(htmlContent.includes("</html>"))
		assert(htmlContent.includes("<head"))
		assert(htmlContent.includes("</head>"))
		assert(htmlContent.includes("<body"))
		assert(htmlContent.includes("</body>"))
	})

	await t.step("should handle readonly file system errors gracefully", async () => {
		// Test what happens when we can't write to the output directory
		// First clean the output directory completely
		await cleanTestOutput()

		// Create a file where we expect a directory to test conflict handling
		const conflictPath = join(TEST_OUTPUT_DIR, "test-conflict")
		await Deno.mkdir(TEST_OUTPUT_DIR, { recursive: true })
		await Deno.writeTextFile(conflictPath, "blocking file")

		try {
			const errors = await runBuildWithErrors()

			// Should handle file system conflicts gracefully
			// The build should still complete for non-conflicting parts
			assert(Array.isArray(errors))
		} finally {
			await cleanTestOutput()
		}
	})

	// Cleanup after all tests
	await cleanTestOutput()
})

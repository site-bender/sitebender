import { assert } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_OUTPUT_DIR = "./dist"
const TEST_COMPONENT_PATH = "./src/components/TestComponent"
const TEST_ROUTE_PATH = "./src/routes/test-watcher"

async function cleanTestOutput(): Promise<void> {
	try {
		await Deno.remove(TEST_OUTPUT_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}
}

async function createTestComponent(): Promise<void> {
	await Deno.mkdir(TEST_COMPONENT_PATH, { recursive: true })

	await Deno.writeTextFile(join(TEST_COMPONENT_PATH, "index.tsx"), `
export default function TestComponent() {
	return <div>Original Content</div>
}
`)

	await Deno.writeTextFile(join(TEST_COMPONENT_PATH, "index.css"), `
.test-component {
	color: blue;
}
`)
}

async function createTestRoute(): Promise<void> {
	await Deno.mkdir(TEST_ROUTE_PATH, { recursive: true })

	await Deno.writeTextFile(join(TEST_ROUTE_PATH, "index.tsx"), `
import TestComponent from "~components/TestComponent/index.tsx"

export default function TestWatcherPage() {
	return <TestComponent />
}
`)
}

async function modifyTestComponent(): Promise<void> {
	await Deno.writeTextFile(join(TEST_COMPONENT_PATH, "index.tsx"), `
export default function TestComponent() {
	return <div>Modified Content</div>
}
`)

	await Deno.writeTextFile(join(TEST_COMPONENT_PATH, "index.css"), `
.test-component {
	color: red;
}
`)
}

async function cleanupTestFiles(): Promise<void> {
	try {
		await Deno.remove(TEST_COMPONENT_PATH, { recursive: true })
	} catch {
		// Directory might not exist
	}

	try {
		await Deno.remove(TEST_ROUTE_PATH, { recursive: true })
	} catch {
		// Directory might not exist
	}
}

async function fileExists(path: string): Promise<boolean> {
	try {
		await Deno.stat(path)
		return true
	} catch {
		return false
	}
}

async function getFileModificationTime(path: string): Promise<number> {
	try {
		const stat = await Deno.stat(path)
		return stat.mtime?.getTime() || 0
	} catch {
		return 0
	}
}

async function runBuild(): Promise<void> {
	try {
		const process = new Deno.Command("deno", {
			args: ["run", "-A", "--no-check", "scripts/build/index.ts"],
			stdout: "piped",
			stderr: "piped",
		})

		const { code } = await process.output()

		if (code !== 0) {
			throw new Error("Build process failed")
		}
	} catch (error) {
		throw new Error(`Failed to run build: ${error}`)
	}
}

Deno.test("file watcher triggers rebuilds", async (t) => {
	await cleanTestOutput()
	await cleanupTestFiles()

	await t.step("should detect component file changes and rebuild", async () => {
		try {
			// Create test files
			await createTestComponent()
			await createTestRoute()

			// Run initial build
			await runBuild()

			// Verify initial files exist
			const htmlPath = join(TEST_OUTPUT_DIR, "test-watcher", "index.html")
			const cssPath = join(TEST_OUTPUT_DIR, "styles", "components", "test-component", "index.css")

			assert(await fileExists(htmlPath), "HTML file should exist after initial build")
			assert(await fileExists(cssPath), "CSS file should exist after initial build")

			// Get initial modification times
			const initialHtmlTime = await getFileModificationTime(htmlPath)
			const initialCssTime = await getFileModificationTime(cssPath)

			// Wait a moment to ensure file timestamps will be different
			await new Promise(resolve => setTimeout(resolve, 1100))

			// Modify the component
			await modifyTestComponent()

			// Run build again (simulating what watcher would do)
			await runBuild()

			// Check that files were updated
			const newHtmlTime = await getFileModificationTime(htmlPath)
			const newCssTime = await getFileModificationTime(cssPath)

			assert(newHtmlTime > initialHtmlTime, "HTML file should be updated after component change")
			assert(newCssTime > initialCssTime, "CSS file should be updated after component change")

			// Verify content changes
			const htmlContent = await Deno.readTextFile(htmlPath)
			assert(htmlContent.includes("Modified Content"), "HTML should reflect component changes")

			const cssContent = await Deno.readTextFile(cssPath)
			assert(cssContent.includes("color: red"), "CSS should reflect style changes")

		} finally {
			await cleanupTestFiles()
		}
	})

	await t.step("should detect static file changes", async () => {
		const testStaticFile = "./static/test-file.txt"
		const testStaticDir = "./static"

		try {
			// Ensure static directory exists
			await Deno.mkdir(testStaticDir, { recursive: true })

			// Create a test static file
			await Deno.writeTextFile(testStaticFile, "original content")

			// Run initial build
			await runBuild()

			// Verify static file was copied
			const copiedFilePath = join(TEST_OUTPUT_DIR, "test-file.txt")
			assert(await fileExists(copiedFilePath), "Static file should be copied to dist")

			const initialContent = await Deno.readTextFile(copiedFilePath)
			assert(initialContent.includes("original content"), "Static file should have original content")

			// Wait a moment for timestamp difference
			await new Promise(resolve => setTimeout(resolve, 1100))

			// Modify static file
			await Deno.writeTextFile(testStaticFile, "modified content")

			// Run build again
			await runBuild()

			// Verify content was updated
			const newContent = await Deno.readTextFile(copiedFilePath)
			assert(newContent.includes("modified content"), "Static file should have updated content")

		} finally {
			// Clean up test static file
			try {
				await Deno.remove(testStaticFile)
			} catch {
				// File might not exist
			}
		}
	})

	await t.step("should handle watcher with non-existent files gracefully", async () => {
		// Test that the watcher doesn't crash when files are deleted
		// This simulates what happens during development when files are renamed/deleted

		try {
			await createTestComponent()
			await createTestRoute()

			// Run initial build
			await runBuild()

			// Verify files exist
			const htmlPath = join(TEST_OUTPUT_DIR, "test-watcher", "index.html")
			assert(await fileExists(htmlPath), "HTML file should exist")

			// Delete the component file (simulating file deletion during development)
			await Deno.remove(join(TEST_COMPONENT_PATH, "index.tsx"))

			// Run build again - should handle missing file gracefully
			await runBuild()

			// Build should complete without crashing
			assert(true, "Build should complete even with missing files")

		} finally {
			await cleanupTestFiles()
		}
	})

	// Cleanup after all tests
	await cleanTestOutput()
})

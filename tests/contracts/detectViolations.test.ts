//++ Tests to detect contract violations in actual library code

import { assertEquals } from "@std/assert"
import detectViolations from "../../libraries/warden/src/detection/detectViolations/index.ts"
import { exec } from "node:child_process"
import { promisify } from "node:util"

const execAsync = promisify(exec)

Deno.test("Detect Violations: Envoy should not import TypeScript", async () => {
	// Use grep to check if Envoy has any TypeScript imports
	try {
		const { stdout } = await execAsync(
			`grep -r "from ['\\"]typescript" libraries/envoy/src/ 2>/dev/null || true`
		)

		if (stdout.trim()) {
			throw new Error(`Found forbidden TypeScript imports in Envoy:\n${stdout}`)
		}
	} catch (error) {
		// If grep finds nothing, it returns non-zero, which is what we want
		if (error && error.stdout && error.stdout.trim()) {
			throw new Error(`Found forbidden TypeScript imports in Envoy`)
		}
	}
})

Deno.test("Detect Violations: Envoy should not access .ts/.tsx files directly", async () => {
	try {
		const { stdout } = await execAsync(
			`grep -r "\\.tsx\\?\\|readFileSync.*\\.ts" libraries/envoy/src/ 2>/dev/null || true`
		)

		if (stdout.trim()) {
			throw new Error(`Envoy is accessing source files directly:\n${stdout}`)
		}
	} catch (error) {
		// Expected to not find anything
		if (error && error.stdout && error.stdout.trim()) {
			throw new Error(`Envoy is accessing source files directly`)
		}
	}
})

Deno.test("Detect Violations: Arborist should not import from Envoy", async () => {
	try {
		const { stdout } = await execAsync(
			`grep -r "from ['\\"].*envoy" libraries/arborist/src/ 2>/dev/null || true`
		)

		if (stdout.trim()) {
			throw new Error(`Arborist is importing from Envoy:\n${stdout}`)
		}
	} catch (error) {
		// Expected to not find anything
		if (error && error.stdout && error.stdout.trim()) {
			throw new Error(`Arborist is importing from Envoy`)
		}
	}
})

Deno.test("Detect Violations: Toolsmith should not import any @sitebender library", async () => {
	try {
		const { stdout } = await execAsync(
			`grep -r "from ['\\"]@sitebender" libraries/toolsmith/src/ 2>/dev/null || true`
		)

		if (stdout.trim()) {
			throw new Error(`Toolsmith is importing @sitebender libraries:\n${stdout}`)
		}
	} catch (error) {
		// Expected to not find anything
		if (error && error.stdout && error.stdout.trim()) {
			throw new Error(`Toolsmith is importing @sitebender libraries`)
		}
	}
})

Deno.test("Detect Violations: Quarrier should not import any @sitebender library", async () => {
	try {
		const { stdout } = await execAsync(
			`grep -r "from ['\\"]@sitebender" libraries/quarrier/src/ 2>/dev/null || true`
		)

		if (stdout.trim()) {
			throw new Error(`Quarrier is importing @sitebender libraries:\n${stdout}`)
		}
	} catch (error) {
		// Expected to not find anything
		if (error && error.stdout && error.stdout.trim()) {
			throw new Error(`Quarrier is importing @sitebender libraries`)
		}
	}
})

Deno.test("Detect Violations: No library should use regex to parse TypeScript", async () => {
	const libraries = ["envoy", "auditor", "pagewright", "architect"]

	for (const lib of libraries) {
		try {
			// Check for regex patterns that look like they're parsing TypeScript
			const { stdout } = await execAsync(
				`grep -r "new RegExp.*\\(function\\|class\\|interface\\|type\\|const\\|let\\|var\\)" libraries/${lib}/src/ 2>/dev/null || true`
			)

			if (stdout.trim()) {
				throw new Error(`${lib} is using regex to parse TypeScript:\n${stdout}`)
			}
		} catch (error) {
			// Expected to not find anything
			if (error && error.stdout && error.stdout.trim()) {
				throw new Error(`${lib} is using regex to parse TypeScript`)
			}
		}
	}
})

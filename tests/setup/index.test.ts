import { assert, assertEquals } from "https://deno.land/std@0.220.1/assert/mod.ts"

async function runGitCommand(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
	const process = new Deno.Command("git", {
		args,
		stdout: "piped",
		stderr: "piped",
	})

	const { code, stdout, stderr } = await process.output()

	return {
		code,
		stdout: new TextDecoder().decode(stdout),
		stderr: new TextDecoder().decode(stderr),
	}
}

async function getGitConfig(key: string): Promise<string | null> {
	const result = await runGitCommand(["config", key])
	return result.code === 0 ? result.stdout.trim() : null
}

async function setGitConfig(key: string, value: string): Promise<void> {
	await runGitCommand(["config", key, value])
}

async function unsetGitConfig(key: string): Promise<void> {
	await runGitCommand(["config", "--unset", key])
}

Deno.test("setup configures git hooks", async (t) => {
	// Store original config to restore later
	const originalHooksPath = await getGitConfig("core.hooksPath")

	await t.step("should set git hooks path to .githooks", async () => {
		// Import and run setup function
		const setup = (await import("~scripts/setup/index.ts")).default
		await setup()

		// Verify git config was set correctly
		const hooksPath = await getGitConfig("core.hooksPath")
		assertEquals(hooksPath, ".githooks", "Git hooks path should be set to .githooks")
	})

	await t.step("should handle git command errors gracefully", async () => {
		// Test that our git helper functions work correctly
		const result = await runGitCommand(["--version"])
		assert(result.code === 0, "Git should be available for testing")

		// Test with invalid git command
		const invalidResult = await runGitCommand(["invalid-command"])
		assert(invalidResult.code !== 0, "Invalid git commands should return non-zero exit code")
	})

	await t.step("should work when git hooks path is already set", async () => {
		// Pre-set the hooks path
		await setGitConfig("core.hooksPath", ".githooks")

		// Run setup again
		const setup = (await import("~scripts/setup/index.ts")).default
		await setup()

		// Verify it's still set correctly
		const hooksPath = await getGitConfig("core.hooksPath")
		assertEquals(hooksPath, ".githooks", "Git hooks path should remain set to .githooks")
	})

	// Cleanup: Restore original git config
	if (originalHooksPath) {
		await setGitConfig("core.hooksPath", originalHooksPath)
	} else {
		await unsetGitConfig("core.hooksPath")
	}
})

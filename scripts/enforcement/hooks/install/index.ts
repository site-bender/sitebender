#!/usr/bin/env -S deno run --allow-run --allow-write --allow-read
// Installs Git hooks for this repo (pre-commit running FP checks)

// no-op encoder removed (not needed)

const repoRoot = Deno.cwd()
const gitDir = `${repoRoot}/.git`
const hooksDir = `${repoRoot}/.githooks`
const preCommit = `${hooksDir}/pre-commit`

// Always install a small bootstrap that executes the tracked .githooks/pre-commit

async function ensureDir(path: string) {
	try {
		await Deno.mkdir(path, { recursive: true })
	} catch (e) {
		if (e instanceof Deno.errors.AlreadyExists) return
		throw e
	}
}

export default async function installHooks() {
	try {
		// Confirm this is a Git repo
		await Deno.stat(gitDir)
	} catch {
		console.log("[hooks] .git directory not found — skipping hook install")
		Deno.exit(0)
	}

	await ensureDir(hooksDir)
	// Ensure tracked hooks are executable
	try { await Deno.chmod(preCommit, 0o755) } catch (_e) { /* optional */ }
	try { await Deno.chmod(`${hooksDir}/commit-msg`, 0o755) } catch (_e) { /* optional */ }

	// Point Git to use the tracked hooks directory
	const gitCmd = new Deno.Command("git", { args: ["config", "core.hooksPath", ".githooks"] })
	await gitCmd.output()

	console.log("[hooks] Configured core.hooksPath to .githooks and ensured executables")
}

if (import.meta.main) {
	await installHooks()
}

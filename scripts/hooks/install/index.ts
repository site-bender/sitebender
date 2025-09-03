#!/usr/bin/env -S deno run --allow-run --allow-write --allow-read
// Installs Git hooks for this repo (pre-commit running FP checks)

const encoder = new TextEncoder()

const repoRoot = Deno.cwd()
const gitDir = `${repoRoot}/.git`
const hooksDir = `${gitDir}/hooks`
const preCommit = `${hooksDir}/pre-commit`

// Use plain string literals (not template literals) to avoid ${...} interpolation
const preCommitContent = [
	"#!/usr/bin/env bash",
	"set -euo pipefail",
	"",
	"# Block commits that touch libraries/toolkit unless ALLOW_TOOLKIT=1",
	"CHANGED=$(git diff --cached --name-only || true)",
	'if echo "$CHANGED" | grep -E "^libraries/toolkit/" >/dev/null 2>&1; then',
	'  if [[ "${ALLOW_TOOLKIT:-}" != "1" ]]; then',
	'    echo "[hooks] Changes under libraries/toolkit require ALLOW_TOOLKIT=1" >&2',
	'    echo "         Example: ALLOW_TOOLKIT=1 git commit -m "toolkit: update" -- libraries/toolkit" >&2',
	"    exit 1",
	"  fi",
	"fi",
	"",
	"# Skip via env if needed",
	'if [[ "${SKIP_FP_CHECKS:-}" == "1" ]]; then',
	'  echo "[hooks] SKIP_FP_CHECKS=1 — skipping FP checks"',
	"  exit 0",
	"fi",
	"",
	'echo "[hooks] Running strict FP checks (engine, components) ..."',
	"# Ensure Deno is available",
	"if ! command -v deno >/dev/null 2>&1; then",
	'  echo "[hooks] deno not found in PATH" >&2',
	"  exit 1",
	"fi",
	"",
	"deno task fp:engine",
	"",
	"deno task fp:components",
	"",
	"# Enforce alias import policy across packages",
	'if [[ "${SKIP_ALIAS_GUARD:-}" == "1" ]]; then',
	'  echo "[hooks] SKIP_ALIAS_GUARD=1 — skipping alias guard"',
	"else",
	"  deno task lint:aliases",
	"fi",
	"",
	"deno task lint:no-react-junk",
	"",
	'echo "[hooks] FP checks passed"',
	"exit 0",
].join("\n")

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
	await Deno.writeFile(preCommit, encoder.encode(preCommitContent))
	await Deno.chmod(preCommit, 0o755)
	console.log("[hooks] Installed pre-commit hook to run FP checks")
}

if (import.meta.main) {
	await installHooks()
}

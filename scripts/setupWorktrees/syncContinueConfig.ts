#!/usr/bin/env -S deno run --allow-read --allow-write
// Copies the local .continue folder to all worktrees listed by `git worktree list`
// and ensures each worktree uses the tracked hooks via core.hooksPath = .githooks

// no encoder needed

async function readWorktrees(): Promise<string[]> {
	const cmd = new Deno.Command("git", {
		args: ["worktree", "list"],
		stdout: "piped",
	})
	const { stdout } = await cmd.output()
	const text = new TextDecoder().decode(stdout)
	return text
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean)
		.map((l) => l.split(" ")[0]) // first column is the path
}

async function copyDir(src: string, dest: string) {
	for await (const entry of Deno.readDir(src)) {
		const from = `${src}/${entry.name}`
		const to = `${dest}/${entry.name}`
		if (entry.isDirectory) {
			await Deno.mkdir(to, { recursive: true })
			await copyDir(from, to)
		} else if (entry.isFile) {
			const data = await Deno.readFile(from)
			await Deno.mkdir(dest, { recursive: true })
			await Deno.writeFile(to, data)
		}
	}
}

async function ensureHooks(worktreePath: string) {
	const hooksDir = `${worktreePath}/.githooks`
	try {
		await Deno.chmod(`${hooksDir}/pre-commit`, 0o755)
	} catch (_e) { /* optional */ }
	try {
		await Deno.chmod(`${hooksDir}/commit-msg`, 0o755)
	} catch (_e) { /* optional */ }
	const git = new Deno.Command("git", {
		cwd: worktreePath,
		args: ["config", "core.hooksPath", ".githooks"],
	})
	await git.output()
}

async function main() {
	const repoRoot = Deno.cwd()
	const continueSrc = `${repoRoot}/.continue`
	const worktrees = await readWorktrees()

	const jobs: Promise<void>[] = []
	for (const wt of worktrees) {
		if (wt === repoRoot) continue // skip primary
		const dest = `${wt}/.continue`
		jobs.push((async () => {
			await copyDir(continueSrc, dest)
			await ensureHooks(wt)
			console.log(`[sync] Updated .continue and hooks in ${wt}`)
		})())
	}
	await Promise.all(jobs)
}

if (import.meta.main) {
	await main()
}

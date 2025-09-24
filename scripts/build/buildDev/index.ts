import { dirname, join, toFileUrl, fromFileUrl } from "jsr:@std/path"

export default async function buildDev(): Promise<void> {
	// Delegate to the docs app build so paths resolve correctly during tests
	// Resolve docsDir relative to this file's location, not the current CWD
	const originalCwd = Deno.cwd()
	const thisFile = fromFileUrl(import.meta.url)
	// Move up from scripts/build/buildDev/index.ts to repo root (../../../../)
	const repoRoot = dirname(dirname(dirname(dirname(thisFile))))
	const docsDir = join(repoRoot, "applications", "docs")
	try {
		Deno.chdir(docsDir)
		const moduleUrl = toFileUrl(join(docsDir, ".sitebender", "scripts", "build", "buildDev", "index.ts")).href
		const { default: docsBuildDev } = await import(moduleUrl)
		await docsBuildDev()
	} finally {
		Deno.chdir(originalCwd)
	}
}

if (import.meta.main) {
	await buildDev()
}


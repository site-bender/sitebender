import { expect } from "@std/expect"

const td = new TextDecoder()

async function runDeno(args: string[], opts?: { cwd?: string }) {
	const cmd = new Deno.Command("deno", {
		args,
		stdout: "piped",
		stderr: "piped",
		cwd: opts?.cwd,
	})
	const { code, stdout, stderr } = await cmd.output()
	return {
		code,
		success: code === 0,
		stdout: td.decode(stdout),
		stderr: td.decode(stderr),
	}
}

Deno.test("aliasGuards CLI: OK (no violations) when scanning only alias import", async () => {
	const root = await Deno.makeTempDir({ prefix: ".aliastest_ok_" })
	try {
		const srcDir = `${root}/src`
		await Deno.mkdir(srcDir, { recursive: true })
		const file = `${srcDir}/ok.ts`
		await Deno.writeTextFile(
			file,
			'import x from "@sitebender/engine/rendering/index.ts"\nexport const ok = x\n',
		)
		const res = await runDeno([
			"run",
			"--allow-read",
			"scripts/enforceImports/aliasGuards/index.ts",
			root,
		])
		expect(res.success).toBe(true)
		expect(res.stdout.includes("Alias policy: OK")).toBe(true)
		// stderr should be empty on success
		expect(res.stderr.trim().length).toBe(0)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("aliasGuards CLI: exits non-zero and prints hints on violations", async () => {
	const root = await Deno.makeTempDir({ prefix: ".aliastest_violate_" })
	try {
		const srcDir = `${root}/src`
		await Deno.mkdir(srcDir, { recursive: true })
		const file = `${srcDir}/bad.ts`
		await Deno.writeTextFile(
			file,
			[
				"// deep engine import should be flagged",
				'import x from "libraries/engine/src/rendering/index.ts"',
				"export const y = x",
			].join("\n"),
		)
		const res = await runDeno([
			"run",
			"--allow-read",
			"scripts/enforceImports/aliasGuards/index.ts",
			root,
		])
		expect(res.success).toBe(false)
		expect(res.stderr.includes("Alias policy violations")).toBe(true)
		// should include a suggestion hint
		expect(
			res.stderr.includes("@sitebender/engine/") ||
				res.stderr.includes("@sitebender/engine-types/") ||
				res.stderr.includes("@sitebender/toolkit/"),
		).toBe(true)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("aliasGuards CLI: --json outputs machine-readable results and exit code", async () => {
	const root = await Deno.makeTempDir({ prefix: ".aliastest_json_" })
	try {
		const srcDir = `${root}/src`
		await Deno.mkdir(srcDir, { recursive: true })
		await Deno.writeTextFile(
			`${srcDir}/bad.ts`,
			'import x from "libraries/toolkit/src/foo.ts"\nexport const z = x\n',
		)
		const res = await runDeno([
			"run",
			"--allow-read",
			"scripts/enforceImports/aliasGuards/index.ts",
			"--json",
			root,
		])
		const parsed = JSON.parse(res.stdout)
		expect(Array.isArray(parsed.violations)).toBe(true)
		expect(res.success).toBe(false)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("aliasGuards CLI: --quiet suppresses human output on success", async () => {
	const root = await Deno.makeTempDir({ prefix: ".aliastest_quiet_" })
	try {
		const srcDir = `${root}/src`
		await Deno.mkdir(srcDir, { recursive: true })
		await Deno.writeTextFile(
			`${srcDir}/ok.ts`,
			'import x from "@sitebender/engine/rendering/index.ts"\nexport const ok = x\n',
		)
		const res = await runDeno([
			"run",
			"--allow-read",
			"scripts/enforceImports/aliasGuards/index.ts",
			"--quiet",
			root,
		])
		expect(res.success).toBe(true)
		expect(res.stdout.trim().length).toBe(0)
		expect(res.stderr.trim().length).toBe(0)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("aliasGuards CLI: --help and --version", async () => {
	const help = await runDeno([
		"run",
		"--allow-read",
		"scripts/enforceImports/aliasGuards/index.ts",
		"--help",
	])
	expect(help.success).toBe(true)
	expect(help.stdout.includes("Usage:")).toBe(true)
	expect(help.stderr.trim().length).toBe(0)

	const version = await runDeno([
		"run",
		"--allow-read",
		"scripts/enforceImports/aliasGuards/index.ts",
		"--version",
	])
	expect(version.success).toBe(true)
	expect(version.stdout.trim()).toBe("1.0.0")
	expect(version.stderr.trim().length).toBe(0)
})

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

Deno.test("coverage reporter CLI: produces report or 'No markers' and no stderr", async () => {
	const res = await runDeno([
		"run",
		"-A",
		"--unstable-temporal",
		"scripts/coverage-tools/reportIgnored/index.ts",
	])
	expect(
		res.stdout.includes("No deno-coverage-ignore markers found.") ||
		res.stdout.includes("=== "),
	).toBe(true)
	expect(res.stderr.trim().length).toBe(0)
})

Deno.test("coverage reporter CLI: --json and custom --root --dirs", async () => {
	const root = await Deno.makeTempDir({ prefix: ".cov_cli_json_" })
	try {
		const only = `${root}/only`
		await Deno.mkdir(only, { recursive: true })
		await Deno.writeTextFile(
			`${only}/x.ts`,
			"// deno-coverage-ignore: reason here\nexport {}\n",
		)
		const res = await runDeno([
			"run",
			"-A",
			"--unstable-temporal",
			"scripts/coverage-tools/reportIgnored/index.ts",
			"--json",
			"--root",
			root,
			"--dirs",
			"only",
		])
		const parsed = JSON.parse(res.stdout)
		// Since path doesn't start with known labels, it should be grouped under 'root'
		expect(Array.isArray(parsed.root)).toBe(true)
		expect(parsed.root.length).toBe(1)
		expect(parsed.root[0].file.endsWith("only/x.ts")).toBe(true)
		// CLI should not write to stderr
		expect(res.stderr.trim().length).toBe(0)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("coverage reporter CLI: --help and --version", async () => {
	const help = await runDeno([
		"run",
		"-A",
		"--unstable-temporal",
		"scripts/coverage-tools/reportIgnored/index.ts",
		"--help",
	])
	expect(help.success).toBe(true)
	expect(help.stdout.includes("Usage:")).toBe(true)
	expect(help.stderr.trim().length).toBe(0)

	const version = await runDeno([
		"run",
		"-A",
		"--unstable-temporal",
		"scripts/coverage-tools/reportIgnored/index.ts",
		"--version",
	])
	expect(version.success).toBe(true)
	expect(version.stdout.trim()).toBe("1.0.0")
	expect(version.stderr.trim().length).toBe(0)
})


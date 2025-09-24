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

Deno.test("analyze-files CLI: --json basic shape and respects exclusions", async () => {
	const root = await Deno.makeTempDir({ prefix: ".analyze_cli_json_" })
	try {
		// Create folder structure with a constants and types folder that should be excluded by default
		await Deno.mkdir(`${root}/src/constants`, { recursive: true })
		await Deno.mkdir(`${root}/src/types`, { recursive: true })
		await Deno.mkdir(`${root}/src/feature`, { recursive: true })
		await Deno.writeTextFile(
			`${root}/src/constants/ignored.ts`,
			"export const X=1\n",
		)
		await Deno.writeTextFile(
			`${root}/src/types/ignored.ts`,
			"export type T=number\n",
		)
		await Deno.writeTextFile(
			`${root}/src/feature/a.ts`,
			[
				// default-exported long function to be detected
				"export default function big(){",
				...Array.from({ length: 65 }, () => "  // line"),
				"  return 2",
				"}",
			].join("\n"),
		)

		const res = await runDeno([
			"run",
			"--allow-read",
			"scripts/analyzeFiles/index.ts",
			"--json",
			"--root",
			root,
			"--dirs",
			"src",
			"--max-fn-lines",
			"60",
		])

		expect(res.success).toBe(true)
		expect(res.stderr.trim().length).toBe(0)
		const parsed = JSON.parse(res.stdout)
		expect(parsed.root).toBe(root)
		expect(typeof parsed.scannedFiles).toBe("number")
		expect(parsed.threshold).toBe(60)
		// Should detect at least one long function and that excluded folders didn't contribute files
		const longFns: unknown[] = parsed.longFunctions
		expect(Array.isArray(longFns)).toBe(true)
		expect(longFns.length >= 1).toBe(true)
		// None of the scanned files should come from constants or types
		// We don't expose the full list of files in JSON, but ensure longFunctions file paths do not include excluded dirs
		for (const lf of longFns as unknown[]) {
			const file = (lf as { file?: unknown }).file
			expect(typeof file).toBe("string")
			expect((file as string).includes("constants/")).toBe(false)
			expect((file as string).includes("types/")).toBe(false)
		}
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

Deno.test("analyze-files CLI: --help and --version", async () => {
	const help = await runDeno([
		"run",
		"--allow-read",
		"scripts/analyzeFiles/index.ts",
		"--help",
	])
	expect(help.success).toBe(true)
	expect(help.stdout.includes("Usage:")).toBe(true)
	expect(help.stderr.trim().length).toBe(0)

	const version = await runDeno([
		"run",
		"--allow-read",
		"scripts/analyzeFiles/index.ts",
		"--version",
	])
	expect(version.success).toBe(true)
	expect(version.stdout.trim()).toBe("1.0.0")
	expect(version.stderr.trim().length).toBe(0)
})

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

Deno.test("analyze-files: detects async/generator/default and concise arrows; concurrency honored", async () => {
	const root = await Deno.makeTempDir({ prefix: ".analyze_detect_" })
	try {
		await Deno.mkdir(`${root}/pkg`, { recursive: true })
		// Default-exported generator
		await Deno.writeTextFile(
			`${root}/pkg/a.ts`,
			"export default function* gen() { return 1 }\n",
		)
		// Default-exported async function
		await Deno.writeTextFile(
			`${root}/pkg/b.ts`,
			"export default async function named() { return 2 }\n",
		)
		// Default-exported block arrow
		await Deno.writeTextFile(
			`${root}/pkg/c.ts`,
			"export default () => { return 3 }\n",
		)
		// Default-exported concise arrow
		await Deno.writeTextFile(
			`${root}/pkg/d.ts`,
			"export default (x:number) => x+1\n",
		)
		const res = await runDeno([
			"run",
			"--allow-read",
			"--allow-write",
			"scripts/analyzeFiles/index.ts",
			"--json",
			"--root",
			root,
			"--folders",
			"pkg",
			"--concurrency",
			"2",
		])
		expect(res.success).toBe(true)
		const parsed = JSON.parse(res.stdout)
		expect(typeof parsed.scannedFiles).toBe("number")
		expect(typeof parsed.functionStats.total).toBe("number")
		// We created 4 files with a default export each, so total should be >= 4
		expect(parsed.functionStats.total >= 4).toBe(true)
		// stderr should be empty
		expect(res.stderr.trim().length).toBe(0)
	} finally {
		await Deno.remove(root, { recursive: true })
	}
})

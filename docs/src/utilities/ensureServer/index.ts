import { delay } from "jsr:@std/async/delay"

async function isUp(base: string): Promise<boolean> {
	const url = (base.endsWith("/") ? base : base + "/") + "index.html"
	try {
		const res = await fetch(url, { method: "GET" })
		return res.status === 200
	} catch {
		return false
	}
}

export default async function ensureServer(port = 5556): Promise<void> {
	const base = `http://localhost:${port}`
	if (await isUp(base)) return

	// Build once (docs cwd)
	const docsCwd = new URL("../../..", import.meta.url)
	const build = new Deno.Command("deno", {
		args: ["task", "build"],
		cwd: docsCwd,
		stdout: "inherit",
		stderr: "inherit",
	})
	const { code } = await build.output()
	if (code !== 0) throw new Error("Build failed")

	// Start std file-server on requested port serving dist/
	const serve = new Deno.Command("deno", {
		args: [
			"run",
			"--allow-net",
			"--allow-read",
			"jsr:@std/http/file-server",
			"--port",
			String(port),
			"dist/",
		],
		cwd: docsCwd,
		stdout: "piped",
		stderr: "piped",
	}).spawn()

	// Capture stderr for diagnostics if startup fails
	let stderrText = ""
	if (serve.stderr) {
		const reader = serve.stderr.getReader()
		const decoder = new TextDecoder()
		;(async () => {
			try {
				while (true) {
					const { value, done } = await reader.read()
					if (done) break
					if (value) stderrText += decoder.decode(value)
				}
			} catch {
				// ignore
			}
		})()
	}

	// Track early exit
	let exited: { code: number } | null = null
	;(async () => {
		try {
			const status = await serve.status
			exited = { code: status.code }
		} catch {
			exited = { code: -1 }
		}
	})()

	// Wait until up with a hard timeout (30s)
	const timeoutMs = 45000
	const start = Date.now()
	const poll = async (): Promise<void> => {
		const up = await isUp(base)
		if (up) return
		if (exited) {
			throw new Error(
				`Server process exited (code ${exited.code}). stderr: ${stderrText}`,
			)
		}
		if (Date.now() - start > timeoutMs) {
			try {
				serve.kill("SIGTERM")
			} catch (_err) {
				// ignore kill errors
			}
			throw new Error(
				`Server did not start in time on ${base}. stderr: ${stderrText}`,
			)
		}
		await delay(250)
		return poll()
	}
	await poll()
}

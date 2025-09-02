export default async function watchForChanges(
	buildScript?: string,
): Promise<void> {
	const watcher = Deno.watchFs(["assets", "pages", "sites", "tests"])
	const script = buildScript || "scripts/build/index.ts"

	console.log("👀 Watching assets/, pages/, sites/, and tests/ for changes...")

	for await (const event of watcher) {
		if (
			event.kind === "modify" || event.kind === "create" ||
			event.kind === "remove"
		) {
			console.log(`📁 File changed: ${event.paths.join(", ")}`)
			console.log("🔄 Rebuilding...")

			try {
				const process = new Deno.Command("deno", {
					args: ["run", "-A", "--no-check", script],
					stdout: "piped",
					stderr: "piped",
				})

				const { code, stdout, stderr } = await process.output()

				if (code === 0) {
					console.log("✅ Build completed successfully")
					// Optionally log build output
					const output = new TextDecoder().decode(stdout)
					if (output.trim()) {
						console.log(output)
					}
				} else {
					console.error("❌ Build failed")
					const errorOutput = new TextDecoder().decode(stderr)
					if (errorOutput.trim()) {
						console.error(errorOutput)
					}
				}
			} catch (error) {
				console.error("❌ Failed to run build script:", error)
			}
		}
	}
}

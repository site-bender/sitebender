const ensureServer = async (port: number = 5556): Promise<void> => {
	const isServerRunning = (await import("./isServerRunning/index.ts")).default
	const ensureBuild = (await import("./ensureBuild/index.ts")).default

	if (await isServerRunning(port)) {
		console.log(`✓ Server already running on port ${port}`)
		return
	}

	await ensureBuild()

	console.log(`🚀 Starting server on port ${port}...`)
	const command = new Deno.Command("deno", {
		args: [
			"run",
			"--allow-all",
			"scripts/serve/createServer/standalone/index.ts",
			"--port",
			port.toString(),
		],
		stdout: "piped",
		stderr: "piped",
	})

	command.spawn()

	for (let i = 0; i < 30; i++) {
		if (await isServerRunning(port)) {
			console.log(`✓ Server ready on port ${port}`)
			return
		}
		await new Promise((resolve) => setTimeout(resolve, 500))
	}

	throw new Error(`Server failed to start on port ${port}`)
}

export default ensureServer

const ensureBuild = async (): Promise<void> => {
	const hasBuild = (await import("./hasBuild/index.ts")).default

	if (await hasBuild()) {
		console.log("✓ Build already exists")
		return
	}

	console.log("🔨 Building project...")
	const command = new Deno.Command("deno", {
		args: ["task", "build"],
		stdout: "inherit",
		stderr: "inherit",
	})

	const status = await command.output()
	if (!status.success) {
		throw new Error("Build failed")
	}

	console.log("✅ Build completed")
}

export default ensureBuild

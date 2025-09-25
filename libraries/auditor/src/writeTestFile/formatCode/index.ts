export default async function formatCode(code: string): Promise<string> {
	try {
		const command = new Deno.Command("deno", {
			args: ["fmt", "-"],
			stdin: "piped",
			stdout: "piped",
			stderr: "piped",
		})

		const process = command.spawn()
		const writer = process.stdin.getWriter()
		await writer.write(new TextEncoder().encode(code))
		await writer.close()

		const output = await process.output()

		if (output.success) {
			return new TextDecoder().decode(output.stdout)
		}
	} catch {
		// Formatting failed, return unformatted code
	}

	return code
}

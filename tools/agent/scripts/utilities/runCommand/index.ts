import type { CommandResult } from "../../../types/index.ts"

const decode = (bytes: Uint8Array) => new TextDecoder().decode(bytes)

export default async function runCommand(
	command: Array<string>,
): Promise<CommandResult> {
	try {
		const process = new Deno.Command(command[0], {
			args: command.slice(1),
			stdout: "piped",
			stderr: "piped",
		})
		const { code, stdout, stderr } = await process.output()

		return { code, stdout: decode(stdout), stderr: decode(stderr) }
	} catch (error) {
		const message = (error && typeof error === "object" && "message" in error)
			? String((error as { message: unknown }).message)
			: String(error)

		return { code: 127, stdout: "", stderr: message }
	}
}

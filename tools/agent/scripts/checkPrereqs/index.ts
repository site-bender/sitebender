import runCommand from "../utilities/runCommand/index.ts"
import { isMacOS } from "./isMacOS/index.ts"
import joinLines from "./joinLines/index.ts"
import makeGuidance from "./makeGuidance/index.ts"
import makeReport from "./makeReport/index.ts"
import parseComposeVersion from "./parseComposeVersion/index.ts"
import parseDenoVersion from "./parseDenoVersion/index.ts"
import parseDockerVersion from "./parseDockerVersion/index.ts"

export async function checkPrerequisites(): Promise<number> {
	const deno = await runCommand(["deno", "--version"])
	const docker = await runCommand(["docker", "--version"])
	const compose = await runCommand(["docker", "compose", "version"])

	const results = [
		{ name: "Deno", ...parseDenoVersion(deno.stdout + deno.stderr) },
		{
			name: "Docker",
			...parseDockerVersion(docker.stdout + docker.stderr),
		},
		{
			name: "Docker Compose",
			...parseComposeVersion(
				compose.stdout + compose.stderr,
				compose.code,
			),
		},
	]

	const missing = results.filter((result) => !result.ok).map((result) =>
		result.name
	)
	const report = makeReport(
		{
			joinLines,
			makeGuidance: (names: Array<string>) =>
				makeGuidance({ isMacOS, joinLines }, names),
		},
		results,
		missing,
	)

	console.log(report)

	return missing.length > 0 ? 1 : 0
}

if (import.meta.main) {
	const code = await checkPrerequisites()

	Deno.exit(code)
}

export default checkPrerequisites

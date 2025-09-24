import type { MakeGuidanceDependencies } from "../../../types/index.ts"

export default function makeGuidance(
	deps: MakeGuidanceDependencies,
	missingNames: Array<string>,
): string {
	const guidanceLines: Array<string> = []
	if (missingNames.includes("Deno")) {
		guidanceLines.push(
			deps.isMacOS()
				? "Install Deno:  curl -fsSL https://deno.land/install.sh | sh"
				: "Install Deno:  https://deno.land/#installation",
		)
	}
	if (
		missingNames.includes("Docker") ||
		missingNames.includes("Docker Compose")
	) {
		guidanceLines.push(
			deps.isMacOS()
				? "Install Docker Desktop for Mac:  https://www.docker.com/products/docker-desktop/"
				: "Install Docker:  https://docs.docker.com/get-docker/",
		)
	}

	return guidanceLines.length
		? `\nSetup guidance:\n${
			deps.joinLines(guidanceLines.map((line) => "  " + line))
		}`
		: ""
}

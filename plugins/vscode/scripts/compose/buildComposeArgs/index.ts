import { DOCKER_COMPOSE_FILE_FLAG } from "../../../constants/index.ts"

export default function buildComposeArgs(action: string): Array<string> {
	const extra = action === "up" ? ["-d"] : []

	return ["docker", "compose", ...DOCKER_COMPOSE_FILE_FLAG, action, ...extra]
}

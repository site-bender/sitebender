// Named exports for constants used across the agent scripts

export const DOCKER_COMPOSE_FILE_FLAG = ["-f", "docker-compose.yml"] as const

export const DOCKER_VALID_ACTIONS = new Set([
	"up",
	"down",
	"restart",
	"ps",
	"logs",
])

export const SITEBENDER_DEV_TASK = "deno run -A applications/example/main.ts"

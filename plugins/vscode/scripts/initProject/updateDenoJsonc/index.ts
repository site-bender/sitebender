import type { DenoTasksMap } from "../../../types/index.ts"

import { SITEBENDER_DEV_TASK } from "../../../constants/index.ts"
import parseJsonc from "../parseJsonc/index.ts"

export default async function updateDenoJsonc(): Promise<string> {
	const path = "deno.jsonc"
	try {
		const text = await Deno.readTextFile(path)
		const data = parseJsonc(text) as { tasks?: DenoTasksMap }
		const tasks: DenoTasksMap = { ...(data.tasks ?? {}) }

		tasks["sitebender:dev"] = tasks["sitebender:dev"] ?? SITEBENDER_DEV_TASK
		const json = JSON.stringify({ ...data, tasks }, null, 2) + "\n"
		await Deno.writeTextFile(path, json)
		return 'Updated deno.jsonc with task "sitebender:dev"'
	} catch {
		const cfg = { tasks: { "sitebender:dev": SITEBENDER_DEV_TASK } }
		await Deno.writeTextFile(path, JSON.stringify(cfg, null, 2) + "\n")
		return 'Created deno.jsonc with task "sitebender:dev"'
	}
}

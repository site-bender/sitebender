import ensureDirectory from "./ensureDirectory/index.ts"
import ensureFile from "./ensureFile/index.ts"
import updateDenoJsonc from "./updateDenoJsonc/index.ts"

export async function initProject(): Promise<number> {
	console.log(`Initializing Sitebender project in ${Deno.cwd()}`)

	await ensureDirectory("applications/example/routes")
	await ensureDirectory("applications/example/architect")

	await ensureFile(
		"applications/example/main.ts",
		`import { start } from "../../libraries/artificer/src/server.ts"

if (import.meta.main) {
  await start({ port: 8080 })
}
`,
	)

	await ensureFile(
		"applications/example/routes/index.tsx",
		`export default function Index() {
  return <div>Welcome to Sitebender</div>
}
`,
	)

	console.log(await updateDenoJsonc())
	console.log("Project initialization complete.")

	return 0
}

if (import.meta.main) {
	const code = await initProject()

	Deno.exit(code)
}

export default initProject

import runCommand from "../utilities/runCommand/index.ts"
import buildComposeArgs from "./buildComposeArgs/index.ts"
import isValidAction from "./isValidAction/index.ts"
import validActions from "./validActions/index.ts"

const main = async (actionArg?: string): Promise<number> => {
	const action = actionArg ?? (Deno.args[0] ?? "up")

	if (!isValidAction(action)) {
		console.error(
			`Unknown action: ${action}. Use one of: ${
				Array.from(validActions).join(", ")
			}`,
		)

		return 2
	}

	const args = buildComposeArgs(action)
	const { code } = await runCommand(args)

	return code
}

if (import.meta.main) {
	const code = await main()
	Deno.exit(code)
}

export default main

import includes from "../../../toolsmith/src/array/includes/index.ts"
import runIO from "../../../toolsmith/src/monads/io/runIO/index.ts"
/// <reference lib="deno.ns" />
/// <reference lib="deno.window" />
//++ Quartermaster CLI: new (help-only stub; no writes)
import _printHelp from "../_printHelp/index.ts"

//++ Exposed entry for quartermaster:new
export default function new(args?: string[]): void {
	const argv = args ?? Deno.args
	if (argv.length === 0) {
		runIO(_printHelp())
		return
	}
	const helpResult = includes("--help")(argv)
	if (helpResult._tag === "Ok" && (helpResult as any).value) {
		runIO(_printHelp())
		return
	}
	// Stub phase: only help is available
	runIO(_printHelp())
}

if (import.meta.main) {
	quartermasterNew(Deno.args)
}

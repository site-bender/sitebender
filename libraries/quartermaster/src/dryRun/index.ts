import includes from "../../../toolsmith/src/array/includes/index.ts"
import runIo from "../../../toolsmith/src/monads/io/runIo/index.ts"
/// <reference lib="deno.ns" />
/// <reference lib="deno.window" />
//++ Quartermaster CLI: dry-run (help-only stub; no writes)
import _printHelp from "../_printHelp/index.ts"

//++ Exposed entry for quartermaster:dry-run
export default function dryRun(args?: string[]): void {
	const argv = args ?? Deno.args
	if (argv.length === 0) {
		runIo(_printHelp())
		return
	}
	const helpResult = includes("--help")(argv)
	if (helpResult._tag === "Ok" && (helpResult as any).value) {
		runIo(_printHelp())
		return
	}
	// Stub phase: only help is available
	runIo(_printHelp())
}

if (import.meta.main) {
	quartermasterDryRun(Deno.args)
}

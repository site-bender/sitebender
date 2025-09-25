import { _includesFlag } from "../_includesFlag/index.ts"
/// <reference lib="deno.ns" />
/// <reference lib="deno.window" />
//++ Quartermaster CLI: dry-run (help-only stub; no writes)
import { _printHelp } from "../_printHelp/index.ts"

//++ Exposed entry for quartermaster:dry-run
export function quartermasterDryRun(args?: string[]): void {
	const argv = args ?? Deno.args
	if (argv.length === 0) {
		_printHelp()
		return
	}
	if (_includesFlag(argv, "--help")) {
		_printHelp()
		return
	}
	// Stub phase: only help is available
	_printHelp()
}

if (import.meta.main) {
	quartermasterDryRun(Deno.args)
}

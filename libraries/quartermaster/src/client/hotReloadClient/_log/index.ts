import type { HotReloadConfig } from "../types/index.ts"
import type { Io } from "@sitebender/toolsmith/types/fp/io"

//++ Logs info messages to console only when debug mode is enabled
export default function _log(
	configuration: Readonly<Required<HotReloadConfig>>,
) {
	return function logWithConfiguration(
		...args: ReadonlyArray<unknown>
	): Io<void> {
		return function executeLog(): void {
			if (configuration.debug) {
				console.log("[Hot Reload]", ...args)
			}
		}
	}
}

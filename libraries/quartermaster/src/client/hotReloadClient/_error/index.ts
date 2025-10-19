import type { HotReloadConfig } from "../types/index.ts"
import type { IO } from "@sitebender/toolsmith/types/fp/io"

//++ Logs error messages to console only when debug mode is enabled
export default function _error(
	configuration: Readonly<Required<HotReloadConfig>>,
) {
	return function errorWithConfiguration(
		...args: ReadonlyArray<unknown>
	): IO<void> {
		return function executeError(): void {
			if (configuration.debug) {
				console.error("[Hot Reload]", ...args)
			}
		}
	}
}

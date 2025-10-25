import type { Io } from "../../../toolsmith/src/types/fp/io/index.ts"
import io from "../../../toolsmith/src/monads/io/io/index.ts"
import map from "../../../toolsmith/src/monads/io/map/index.ts"
import { HELP_MESSAGE } from "./constants/index.ts"

//++ Prints Quartermaster CLI usage information (private helper; stub phase)
// [IO] This function performs side effects
export default function _printHelp(): Io<void> {
	return map(console.log)(io(HELP_MESSAGE))
}

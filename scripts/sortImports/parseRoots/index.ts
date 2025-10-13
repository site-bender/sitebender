import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"
import slice from "@sitebender/toolsmith/string/slice/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"

//++ Parses root directories from command-line arguments
export default function parseRoots(args: Array<string>): Array<string> {
	const defaults = [
		"agent",
		"mission-control",
		"the-workshop",
		"libraries",
		"scripts",
	]

	function extractDir(arg: string): string | null {
		if (startsWith("--dir=")(arg)) {
			return slice(6)(Infinity)(arg)
		}
		if (startsWith("-")(arg)) {
			return null
		}

		return arg
	}

	function isNotNull<T>(value: T | null): value is T {
		return value !== null
	}

	const selected = pipe([
		map(extractDir),
		filter(isNotNull),
		Array.from,
	])(args)

	return selected.length > 0 ? selected : defaults
}

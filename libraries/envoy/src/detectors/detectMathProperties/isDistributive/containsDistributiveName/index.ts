import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import { DISTRIBUTIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if source code contains any distributive function names
export default function containsDistributiveName(source: string): boolean {
	return some(function hasName(name: string) {
		return contains(name)(source)
	})(Array.from(DISTRIBUTIVE_FUNCTION_NAMES))
}

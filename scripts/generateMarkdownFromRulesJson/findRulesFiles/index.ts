import type { RulesFile } from "../types/index.ts"

import filter from "../../../libraries/toolsmith/src/vanilla/array/filter/index.ts"
import map from "../../../libraries/toolsmith/src/vanilla/array/map/index.ts"
import pipe from "../../../libraries/toolsmith/src/vanilla/combinator/pipe/index.ts"
import isNotNullish from "../../../libraries/toolsmith/src/vanilla/validation/isNotNullish/index.ts"
import { RULES_FILE_LOCATIONS } from "../constants/index.ts"
import toRulesFile from "./toRulesFile/index.ts"

const PROJECT_ROOT = new URL("../../..", import.meta.url).pathname

//++ Finds all rules JSON files in the project
export default function findRulesFiles(): Array<RulesFile> {
	const toRulesFileWithRoot = (location: string) =>
		toRulesFile(location, PROJECT_ROOT)

	return pipe([
		map(toRulesFileWithRoot),
		filter(isNotNullish),
	])(RULES_FILE_LOCATIONS)
}

//?? [EXAMPLE]
// findRulesFiles() // Returns array of RulesFile objects for existing files

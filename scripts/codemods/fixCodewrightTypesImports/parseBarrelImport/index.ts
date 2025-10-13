import filter from "@sitebender/toolsmith/lifted/filter/index.ts"
import map from "@sitebender/toolsmith/lifted/map/index.ts"
import pipe from "@sitebender/toolsmith/pipe/index.ts"
import arrayIsNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"
import split from "@sitebender/toolsmith/string/split/index.ts"
import trim from "@sitebender/toolsmith/string/trim/index.ts"
import isNotNullish from "@sitebender/toolsmith/validation/isNotNullish/index.ts"

import type { ImportSpec } from "../types/index.ts"

import { BARREL_IMPORT_REGEX } from "../../constants/index.ts"
import parseSpecifier from "./parseSpecifier/index.ts"

//++ Parses barrel import lines to extract import specifications
export default function parseBarrelImport(line: string): ImportSpec[] | null {
	const matchResult = line.match(BARREL_IMPORT_REGEX)
	if (not(matchResult)) {
		return null
	}

	const importSpecifiers = matchResult[1]

	const specs = pipe(
		importSpecifiers,
		split(","),
		map(trim),
		filter(isNotEmpty),
		map(parseSpecifier),
		filter(isNotNullish),
		Array.from,
	) as ImportSpec[]

	return arrayIsNotEmpty(specs) ? specs : null
}

//?? [EXAMPLE]
// parseBarrelImport('import { Person as PersonComponent } from "../../pagewright/index.tsx"')
// Returns: [{ original: "Person as PersonComponent", symbol: "Person", component: "PersonComponent" }]

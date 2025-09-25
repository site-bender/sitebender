// deno-lint-ignore-file no-explicit-any
import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

import {
	TYPE_IMPORT_DEFAULT_REGEX,
	TYPE_IMPORT_NAMED_REGEX,
} from "../../constants/index.ts"

//++ Builds a map of type imports from file content, curried for functional composition
export default function buildTypeImportMap(content: string) {
	return function withFileDir(fileDir: string): Map<string, string> {
		const map = new Map<string, string>()

		//-- [REFACTOR] For loops should be replaced with functional approach
		for (const m of content.matchAll(TYPE_IMPORT_DEFAULT_REGEX)) {
			const [, name, rel] = m as any
			const abs = resolve(fileDir, rel)
			map.set(name, abs)
		}

		for (const m of content.matchAll(TYPE_IMPORT_NAMED_REGEX)) {
			const [, names, rel] = m as any
			const abs = resolve(fileDir, rel)
			for (const n of names.split(",")) {
				const name = n.trim().split(/\s+as\s+/)[0]
				if (name) map.set(name, abs)
			}
		}

		return map
	}
}

//?? [EXAMPLE]
// const content = 'import type Person from "./Person/index.ts"'
// const mapper = buildTypeImportMap(content)
// const typeMap = mapper("/path/to/dir")
// // typeMap.get("Person") returns absolute path

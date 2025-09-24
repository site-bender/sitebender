import equals from "@sitebender/toolsmith/vanilla/validation/equals/index.ts"
import _joinPath from "./_joinPath/index.ts"

/**
 * Process a single directory entry
 */
export default function _processEntry(dir: string) {
	return function withRecursiveFn(
		recursiveFn: (dir: string) => Promise<string[]>,
	) {
		return async function withEntry(entry: Deno.DirEntry): Promise<string[]> {
			const fullPath = _joinPath(dir)(entry.name)

			if (entry.isDirectory) {
				return await recursiveFn(fullPath)
			}

			return equals("index.ts")(entry.name) ? [fullPath] : []
		}
	}
}

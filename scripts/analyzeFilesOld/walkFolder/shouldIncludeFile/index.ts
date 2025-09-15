import some from "@sitebender/toolkit/vanilla/array/some/index.ts"

import matchesExtension from "./matchesExtension/index.ts"

//++ Checks if a file matches any of the specified extensions
export default function shouldIncludeFile(
	path: string,
	extensions: ReadonlyArray<string>,
): boolean {
	return some(matchesExtension(path))(Array.from(extensions))
}
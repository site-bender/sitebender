import some from "@sitebender/toolsmith/array/some/index.ts"

import checkExtension from "./checkExtension/index.ts"

//++ Checks if a file path matches any of the specified extensions
export default function shouldIncludeFile(
	extensions: ReadonlyArray<string>,
): (path: string) => boolean {
	return function checkFile(path: string): boolean {
		const checkIfPathHasExtension = checkExtension(path)

		return some(checkIfPathHasExtension)(extensions as Array<string>)
	}
}

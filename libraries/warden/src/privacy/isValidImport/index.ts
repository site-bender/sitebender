//++ Check if an import from one file to another is valid under privacy rules
//++
//++ Privacy rules:
//++ 1. Public functions can be imported from anywhere
//++ 2. Private functions can only be imported from within their parent scope
//++ 3. Shared private (_shared/) can be imported from sibling scopes
//++
//++ This is a curried pure function: isValidImport(fromPath)(toPath) => boolean
//++
//++ Examples:
//++   - isValidImport("src/foo/index.ts")("src/foo/_bar/index.ts") → true (same scope)
//++   - isValidImport("src/baz/index.ts")("src/foo/_bar/index.ts") → false (different scope)
//++   - isValidImport("src/foo/index.ts")("src/_shared/index.ts") → true (shared private)

import isPrivateFunction from "../isPrivateFunction/index.ts"
import getParentScope from "../getParentScope/index.ts"

export default function isValidImport(fromPath: string) {
	return function checkImportFromPath(toPath: string): boolean {
		// If target is public, always valid
		if (!isPrivateFunction(toPath)) {
			return true
		}

		// Target is private - check if fromPath is within allowed scope
		const privateScope = getParentScope(toPath)

		// If it's a _shared folder, allow from sibling scopes
		const toSegments = toPath.split("/")
		const hasShared = toSegments.some(function checkIfShared(
			segment: string,
		): boolean {
			return segment === "_shared"
		})

		if (hasShared) {
			// For _shared, check if fromPath shares a common ancestor with the _shared parent
			const sharedParent = privateScope
			return fromPath.startsWith(sharedParent)
		}

		// For non-shared private functions, fromPath must be within the parent scope
		return fromPath.startsWith(privateScope)
	}
}

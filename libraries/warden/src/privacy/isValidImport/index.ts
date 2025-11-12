//++ Check if an import from one file to another is valid under privacy rules
//++
//++ Privacy rules:
//++ 1. Public functions can be imported from anywhere
//++ 2. Private functions can only be imported from within their parent scope
//++
//++ The lowest common ancestor rule is automatically enforced by the parent scope check:
//++ If a private helper is placed at the LCA of its consumers, all consumers will be
//++ within that parent scope and can import it.
//++
//++ This is a curried pure function: isValidImport(fromPath)(toPath) => boolean
//++
//++ Examples:
//++   - isValidImport("src/foo/index.ts")("src/foo/_bar/index.ts") → true (within parent scope)
//++   - isValidImport("src/baz/index.ts")("src/foo/_bar/index.ts") → false (outside parent scope)
//++   - isValidImport("src/privacy/validate/index.ts")("src/privacy/_normalizePath/index.ts") → true (LCA case)

import isPrivateFunction from "../isPrivateFunction/index.ts"
import getParentScope from "../getParentScope/index.ts"

export default function isValidImport(fromPath: string) {
	return function isValidImportWithFromPath(toPath: string): boolean {
		// If target is public, always valid
		if (!isPrivateFunction(toPath)) {
			return true
		}

		// Target is private - fromPath must be within the parent scope
		const privateScope = getParentScope(toPath)

		return fromPath.startsWith(privateScope)
	}
}

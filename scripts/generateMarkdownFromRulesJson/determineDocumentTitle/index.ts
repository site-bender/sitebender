import indexOf from "../../../libraries/toolsmith/src/vanilla/array/indexOf/index.ts"
import nth from "../../../libraries/toolsmith/src/vanilla/array/nth/index.ts"
import concat from "../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import includes from "../../../libraries/toolsmith/src/vanilla/string/contains/index.ts"
import split from "../../../libraries/toolsmith/src/vanilla/string/split/index.ts"
import toSentence from "../../../libraries/toolsmith/src/vanilla/string/toCase/toSentence/index.ts"
import isDefined from "../../../libraries/toolsmith/src/vanilla/validation/isDefined/index.ts"

//++ Determines the document title from the file path
export default function determineDocumentTitle(filePath: string): string {
	const parts = split("/")(filePath)

	if (includes("/applications/")(filePath) && includes("/rules/")(filePath)) {
		return "Application rules"
	}

	if (includes("/libraries/")(filePath)) {
		const librariesIndex = indexOf("libraries")(parts)

		if (isDefined(librariesIndex)) {
			const libraryName = nth(librariesIndex + 1)(parts)

			if (libraryName) {
				const capitalized = toSentence(libraryName)

				return concat(capitalized)(" rules")
			}
		}
	}

	if (includes("rules/index.json")(filePath)) {
		return "Project rules"
	}

	return "Rules documentation"
}

//?? [EXAMPLE]
// determineDocumentTitle("/rules/index.json") // "Project rules"
// determineDocumentTitle("/libraries/envoy/rules/index.json") // "Envoy rules"

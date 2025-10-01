//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getTestFilePath(functionPath: string): string {
	const pathParts = functionPath.split("/")
	const libraryIndex = pathParts.indexOf("libraries")

	if (libraryIndex === -1) {
		throw new Error("Function path must be in libraries directory")
	}

	const libraryName = pathParts[libraryIndex + 1]
	const srcIndex = pathParts.indexOf("src")

	if (srcIndex === -1) {
		throw new Error("Function path must contain src directory")
	}

	const relativePath = pathParts.slice(srcIndex + 1, -1).join("/")
	const rootDir = pathParts.slice(0, libraryIndex).join("/") || "."

	return `${rootDir}/tests/libraries/${libraryName}/${relativePath}/index.test.ts`
}

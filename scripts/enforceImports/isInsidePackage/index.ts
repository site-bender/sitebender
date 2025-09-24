import includes from "@sitebender/toolsmith/vanilla/string/includes/index.ts"

//++ Checks if a file path is inside a specific package directory
export default function isInsidePackage(file: string, packageDir: string): boolean {
	return includes(`/${packageDir}/`)(file)
}

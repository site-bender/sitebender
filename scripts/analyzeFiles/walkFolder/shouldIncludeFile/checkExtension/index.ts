import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"

//++ Creates a predicate that checks if a path ends with a given extension
export default function checkExtension(path: string): (ext: string) => boolean {
	return function checkIfHasExtension(ext: string): boolean {
		return endsWith(ext)(path)
	}
}

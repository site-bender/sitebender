import endsWith from "@sitebender/toolkit/vanilla/string/endsWith/index.ts"

//++ Creates a predicate that checks if a path ends with a given extension
export default function matchesExtension(path: string): (ext: string) => boolean {
	return function checkExtension(ext: string): boolean {
		return endsWith(ext)(path)
	}
}
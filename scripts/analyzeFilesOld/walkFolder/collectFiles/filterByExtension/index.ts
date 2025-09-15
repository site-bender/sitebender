import shouldIncludeFile from "../../shouldIncludeFile/index.ts"

//++ Creates a predicate that filters files by extension
export default function filterByExtension(exts: ReadonlyArray<string>): (path: string) => boolean {
	return function hasMatchingExtension(path: string): boolean {
		return shouldIncludeFile(path, exts)
	}
}
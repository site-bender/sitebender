import shouldProcessDirectory from "../../shouldProcessDirectory/index.ts"

//++ Creates a predicate that filters directories by exclusion list
export default function filterDirectory(excludedDirNames: Set<string>): (entry: Deno.DirEntry) => boolean {
	return function shouldProcessEntry(entry: Deno.DirEntry): boolean {
		return shouldProcessDirectory(entry.name, excludedDirNames)
	}
}
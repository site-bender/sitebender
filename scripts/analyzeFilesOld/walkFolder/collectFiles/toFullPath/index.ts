import joinPath from "../../joinPath/index.ts"

//++ Converts a directory entry to its full path
export default function toFullPath(baseDir: string): (entry: Deno.DirEntry) => string {
	return function entryToFullPath(entry: Deno.DirEntry): string {
		return joinPath(baseDir, entry.name)
	}
}
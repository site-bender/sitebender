//++ Converts a directory entry to its full path
export default function entryToFullPath(dir: string): (entry: Deno.DirEntry) => string {
	return function convertEntryToFullPath(entry: Deno.DirEntry): string {
		return `${dir}/${entry.name}`
	}
}
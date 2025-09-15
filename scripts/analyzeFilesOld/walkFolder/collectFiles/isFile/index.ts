//++ Checks if a directory entry is a file
export default function isFile(entry: Deno.DirEntry): boolean {
	return entry.isFile
}
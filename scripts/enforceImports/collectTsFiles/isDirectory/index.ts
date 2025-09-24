//++ Checks if a directory entry is a directory
export default function isDirectory(entry: Deno.DirEntry): boolean {
	return entry.isDirectory
}
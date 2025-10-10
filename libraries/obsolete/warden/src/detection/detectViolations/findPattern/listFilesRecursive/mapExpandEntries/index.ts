//++ Builds a mapper that expands dir entries into file path Promise arrays
export default function buildMapExpandEntries(
	listFilesRecursive: (dirPath: string) => Promise<Array<string>>,
) {
	return function mapExpandEntries(
		baseDir: string,
		entries: Array<Deno.DirEntry>,
	): Array<Promise<Array<string>>> {
		return entries.map((entry) => {
			const full = `${baseDir}/${entry.name}`
			if (entry.isDirectory) return listFilesRecursive(full)
			if (entry.isFile) return Promise.resolve([full])
			return Promise.resolve([] as Array<string>)
		})
	}
}

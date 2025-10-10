/*++ Builds a mapper that expands folder entries into file path Promise arrays */
export default function createFolderEntryExpander(
	listFilesRecursive: (folderPath: string) => Promise<Array<string>>,
) {
	return function expandFolderEntries(
		baseFolder: string,
		entries: Array<Deno.DirEntry>,
	): Array<Promise<Array<string>>> {
		return entries.map((entry) => {
			const full = `${baseFolder}/${entry.name}`
			if (entry.isDirectory) return listFilesRecursive(full)
			if (entry.isFile) return Promise.resolve([full])
			return Promise.resolve([] as Array<string>)
		})
	}
}

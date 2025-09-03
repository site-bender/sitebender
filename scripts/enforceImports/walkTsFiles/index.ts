// Recursively walk a directory and yield .ts and .tsx files

export default async function* walkTsFiles(
	root: string,
): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(root)) {
		const full = `${root}/${entry.name}`
		if (entry.isDirectory) {
			yield* walkTsFiles(full)
		} else if (entry.isFile && /(\.ts|\.tsx)$/.test(entry.name)) {
			yield full
		}
	}
}

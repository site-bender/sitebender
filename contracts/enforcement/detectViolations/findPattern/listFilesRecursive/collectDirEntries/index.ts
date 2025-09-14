//++ Collects all entries from an AsyncIterator produced by Deno.readDir
export default async function collectDirEntries(
	iterator: AsyncIterator<Deno.DirEntry>,
): Promise<Array<Deno.DirEntry>> {
	const { value, done } = await iterator.next()
	if (done) return []
	const rest = await collectDirEntries(iterator)
	return [value, ...rest]
}

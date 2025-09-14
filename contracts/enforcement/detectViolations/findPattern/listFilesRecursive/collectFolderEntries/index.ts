/*++ Collects all entries from an AsyncIterator produced by Deno.readDir */
export default async function collectFolderEntries(
	iterator: AsyncIterator<Deno.DirEntry>,
): Promise<Array<Deno.DirEntry>> {
	const { value, done } = await iterator.next()
	if (done) return []
	const rest = await collectFolderEntries(iterator)
	return [value, ...rest]
}

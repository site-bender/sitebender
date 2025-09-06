export default async function ensureDirectoryExists(filePath: string): Promise<void> {
	const dir = filePath.substring(0, filePath.lastIndexOf("/"))
	await Deno.mkdir(dir, { recursive: true })
}
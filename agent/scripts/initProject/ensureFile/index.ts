import fileExists from "../fileExists/index.ts"

const encoder = new TextEncoder()

export default async function ensureFile(
	path: string,
	content: string,
): Promise<void> {
	const exists = await fileExists(path)
	if (!exists) await Deno.writeFile(path, encoder.encode(content))
}

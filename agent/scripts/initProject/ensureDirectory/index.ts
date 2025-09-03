export default function ensureDirectory(path: string): Promise<void> {
	return Deno.mkdir(path, { recursive: true }).catch(() => {})
}

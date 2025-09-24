/*++
 | Resolves a repo-rooted or relative path to a filesystem path
 | Treats leading "/" as repo-rooted (not absolute filesystem)
 */
export default function resolvePath(base: URL, inputPath: string): string {
	const normalized = inputPath.startsWith("/")
		? inputPath.replace(/^\//, "")
		: inputPath

	const withSlash = normalized.endsWith("/")
		? normalized
		: normalized + "/"

	const url = new URL(withSlash, base)
	return new URL(".", url).pathname.replace(/\/$/, "")
}

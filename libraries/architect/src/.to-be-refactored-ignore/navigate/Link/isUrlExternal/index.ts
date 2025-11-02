export default function isUrlExternal(url: string): boolean {
	try {
		return /^(https?:)?\/\//.test(url) ||
			url.startsWith("//") ||
			url.startsWith("data:")
	} catch {
		return false
	}
}

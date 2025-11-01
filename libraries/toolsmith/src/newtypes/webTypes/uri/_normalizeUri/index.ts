//++ Normalizes URI to canonical form
//++ Scheme: lowercase
//++ Authority domain: lowercase
//++ Path/Query/Fragment: preserve case
//++ Unicode: NFC normalization
export default function _normalizeUri(uri: string): string {
	//++ [EXCEPTION] .normalize(), .indexOf(), .slice(), .toLocaleLowerCase() permitted in Toolsmith for performance - provides URI normalization wrapper
	const nfcNormalized = uri.normalize("NFC")

	const colonIndex = nfcNormalized.indexOf(":")
	if (colonIndex === -1) {
		return nfcNormalized
	}

	const scheme = nfcNormalized.slice(0, colonIndex).toLocaleLowerCase()
	const afterScheme = nfcNormalized.slice(colonIndex + 1)

	//++ [EXCEPTION] .filter(), Math.min(), spread operator permitted in Toolsmith for performance - provides URI authority parsing wrapper
	if (afterScheme.startsWith("//")) {
		const authorityStart = 2
		const authorityEnd = (() => {
			const slashIdx = afterScheme.indexOf("/", authorityStart)
			const questionIdx = afterScheme.indexOf("?", authorityStart)
			const hashIdx = afterScheme.indexOf("#", authorityStart)
			const validIndices = [slashIdx, questionIdx, hashIdx].filter((idx) =>
				idx !== -1
			)
			return validIndices.length === 0
				? afterScheme.length
				: Math.min(...validIndices)
		})()

		const authority = afterScheme.slice(authorityStart, authorityEnd)
		const rest = afterScheme.slice(authorityEnd)

		const normalizedAuthority = (() => {
			const atIndex = authority.lastIndexOf("@")
			if (atIndex !== -1) {
				const userinfo = authority.slice(0, atIndex)
				const hostAndPort = authority.slice(atIndex + 1)

				const colonIndex = hostAndPort.lastIndexOf(":")
				const host = colonIndex !== -1
					? hostAndPort.slice(0, colonIndex)
					: hostAndPort
				const port = colonIndex !== -1 ? hostAndPort.slice(colonIndex) : ""

				const normalizedHost = !host.startsWith("[")
					? host.toLocaleLowerCase()
					: host

				return userinfo + "@" + normalizedHost + port
			} else {
				const colonIndex = authority.lastIndexOf(":")
				const host = colonIndex !== -1
					? authority.slice(0, colonIndex)
					: authority
				const port = colonIndex !== -1 ? authority.slice(colonIndex) : ""

				const normalizedHost = !host.startsWith("[")
					? host.toLocaleLowerCase()
					: host

				return normalizedHost + port
			}
		})()

		return scheme + "://" + normalizedAuthority + rest
	}

	return scheme + ":" + afterScheme
}

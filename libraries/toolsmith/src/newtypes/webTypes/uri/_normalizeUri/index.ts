//++ Normalizes URI to canonical form
//++ Scheme: lowercase
//++ Authority domain: lowercase
//++ Path/Query/Fragment: preserve case
//++ Unicode: NFC normalization
export default function _normalizeUri(uri: string): string {
	const nfcNormalized = uri.normalize("NFC")

	const colonIndex = nfcNormalized.indexOf(":")
	if (colonIndex === -1) {
		return nfcNormalized
	}

	const scheme = nfcNormalized.slice(0, colonIndex).toLocaleLowerCase()
	const afterScheme = nfcNormalized.slice(colonIndex + 1)

	if (afterScheme.startsWith("//")) {
		const authorityStart = 2
		let authorityEnd = afterScheme.length
		for (let i = authorityStart; i < afterScheme.length; i++) {
			const char = afterScheme[i]
			if (char === "/" || char === "?" || char === "#") {
				authorityEnd = i
				break
			}
		}

		const authority = afterScheme.slice(authorityStart, authorityEnd)
		const rest = afterScheme.slice(authorityEnd)

		let normalizedAuthority = authority

		const atIndex = authority.lastIndexOf("@")
		if (atIndex !== -1) {
			const userinfo = authority.slice(0, atIndex)
			const hostAndPort = authority.slice(atIndex + 1)

			const colonIndex = hostAndPort.lastIndexOf(":")
			let host = colonIndex !== -1
				? hostAndPort.slice(0, colonIndex)
				: hostAndPort
			const port = colonIndex !== -1 ? hostAndPort.slice(colonIndex) : ""

			if (!host.startsWith("[")) {
				host = host.toLocaleLowerCase()
			}

			normalizedAuthority = userinfo + "@" + host + port
		} else {
			const colonIndex = authority.lastIndexOf(":")
			let host = colonIndex !== -1
				? authority.slice(0, colonIndex)
				: authority
			const port = colonIndex !== -1 ? authority.slice(colonIndex) : ""

			if (!host.startsWith("[")) {
				host = host.toLocaleLowerCase()
			}

			normalizedAuthority = host + port
		}

		return scheme + "://" + normalizedAuthority + rest
	}

	return scheme + ":" + afterScheme
}

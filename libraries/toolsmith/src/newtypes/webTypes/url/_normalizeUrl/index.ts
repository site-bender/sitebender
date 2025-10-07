//++ Normalizes URL to canonical form
//++ Applies Unicode NFC normalization and lowercase conversion to protocol and domain
//++ Preserves path, query, and fragment case
export default function _normalizeUrl(urlString: string): string {
	const nfcNormalized = urlString.normalize("NFC")

	const protocolEndIndex = nfcNormalized.indexOf("://")
	if (protocolEndIndex === -1) {
		return nfcNormalized.toLocaleLowerCase()
	}

	const protocol = nfcNormalized.slice(0, protocolEndIndex).toLocaleLowerCase()
	const afterProtocol = nfcNormalized.slice(protocolEndIndex + 3)

	const pathStartIndex = afterProtocol.search(/[/?#]/)
	const domainPart = pathStartIndex === -1
		? afterProtocol
		: afterProtocol.slice(0, pathStartIndex)
	const pathPart = pathStartIndex === -1 ? "" : afterProtocol.slice(pathStartIndex)

	const normalizedDomain = domainPart.toLocaleLowerCase()

	return `${protocol}://${normalizedDomain}${pathPart}`
}

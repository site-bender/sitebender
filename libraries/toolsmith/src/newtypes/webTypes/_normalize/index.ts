//++ Normalizes string to canonical form
//++ Applies Unicode NFC normalization and lowercase conversion
//++ Used for domain names, email addresses, and other web identifiers
export default function _normalize(value: string): string {
	const nfcNormalized = value.normalize("NFC")
	const lowercased = nfcNormalized.toLocaleLowerCase()

	return lowercased
}

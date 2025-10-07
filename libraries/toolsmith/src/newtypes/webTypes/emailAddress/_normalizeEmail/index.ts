//++ Normalizes email address to canonical form
//++ Applies Unicode NFC normalization and lowercase conversion
export default function _normalizeEmail(email: string): string {
	const nfcNormalized = email.normalize("NFC")
	const lowercased = nfcNormalized.toLocaleLowerCase()

	return lowercased
}

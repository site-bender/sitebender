import _normalize from "@sitebender/toolsmith/newtypes/webTypes/_normalize/index.ts"

//++ Normalizes email address to canonical form
//++ Applies Unicode NFC normalization and lowercase conversion
export default function _normalizeEmail(email: string): string {
	return _normalize(email)
}

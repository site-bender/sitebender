//++ Validates contract data integrity by checking hash and frozen state

import hashHex from "../../../../../../../../toolsmith/src/crypto/hashHex/index.ts"
import canonicalStringify from "../../utils/canonicalStringify/index.ts"

export default async function validateContract<T>(
	data: T,
	library: string,
	originalHash: string,
): Promise<boolean> {
	const currentJson = canonicalStringify(data)
	const currentHash = await hashHex(currentJson)

	if (currentHash !== originalHash) {
		console.error(
			`Contract violation: Data hash mismatch in ${library}`,
			"Data may have been tampered with. Please reload and try again.",
		)

		return false
	}

	if (!Object.isFrozen(data)) {
		console.error(
			`Contract violation: Data is not frozen in ${library}`,
			"Data immutability compromised. Please reload and try again.",
		)

		return false
	}

	return true
}

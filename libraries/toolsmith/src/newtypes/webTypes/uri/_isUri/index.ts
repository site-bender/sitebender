import type { Uri } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateScheme from "@sitebender/toolsmith/newtypes/webTypes/uri/_validateScheme/index.ts"
import _validateAuthority from "@sitebender/toolsmith/newtypes/webTypes/uri/_validateAuthority/index.ts"
import _validatePath from "@sitebender/toolsmith/newtypes/webTypes/_validatePath/index.ts"
import _validateQuery from "@sitebender/toolsmith/newtypes/webTypes/_validateQuery/index.ts"
import _validateFragment from "@sitebender/toolsmith/newtypes/webTypes/_validateFragment/index.ts"
import { URI_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid Uri
export default function _isUri(value: string): value is Uri {
	if (value.length === 0 || value.length > URI_MAX_LENGTH) {
		return false
	}

	const colonIndex = value.indexOf(":")
	if (colonIndex === -1) {
		return false
	}

	const scheme = value.slice(0, colonIndex)
	const schemeResult = _validateScheme(scheme)
	if (schemeResult._tag === "Error") {
		return false
	}

	const afterScheme = value.slice(colonIndex + 1)
	let authority = ""
	let path = ""
	let query = ""
	let fragment = ""
	let remaining = afterScheme

	if (remaining.startsWith("//")) {
		remaining = remaining.slice(2)

		let authorityEnd = remaining.length
		for (let i = 0; i < remaining.length; i++) {
			const char = remaining[i]
			if (char === "/" || char === "?" || char === "#") {
				authorityEnd = i
				break
			}
		}

		authority = remaining.slice(0, authorityEnd)
		remaining = remaining.slice(authorityEnd)

		const authorityResult = _validateAuthority(authority)
		if (authorityResult._tag === "Error") {
			return false
		}
	}

	const hashIndex = remaining.indexOf("#")
	if (hashIndex !== -1) {
		fragment = remaining.slice(hashIndex + 1)
		remaining = remaining.slice(0, hashIndex)

		const fragmentResult = _validateFragment(fragment)
		if (fragmentResult._tag === "Error") {
			return false
		}
	}

	const questionIndex = remaining.indexOf("?")
	if (questionIndex !== -1) {
		query = remaining.slice(questionIndex + 1)
		remaining = remaining.slice(0, questionIndex)

		const queryResult = _validateQuery(query)
		if (queryResult._tag === "Error") {
			return false
		}
	}

	path = remaining

	if (path.length > 0) {
		if (authority.length === 0 && path.startsWith("//")) {
			return false
		}

		if (authority.length > 0 && !path.startsWith("/") && path.length > 0) {
			return false
		}

		if (authority.length > 0) {
			const pathResult = _validatePath(path)
			if (pathResult._tag === "Error") {
				return false
			}
		} else {
			const validPathRegex = /^[\p{L}\p{N}\p{M}\-._~:@!$&'()*+,;=%/]+$/u
			if (!validPathRegex.test(path)) {
				return false
			}
		}
	}

	return true
}

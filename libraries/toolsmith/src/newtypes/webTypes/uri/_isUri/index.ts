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
	const hasAuthority = afterScheme.startsWith("//")
	const remainingAfterAuthPrefix = hasAuthority ? afterScheme.slice(2) : afterScheme
	const authorityEnd = hasAuthority ? (() => {
		const slashIdx = remainingAfterAuthPrefix.indexOf("/")
		const questionIdx = remainingAfterAuthPrefix.indexOf("?")
		const hashIdx = remainingAfterAuthPrefix.indexOf("#")
		const validIndices = [slashIdx, questionIdx, hashIdx].filter(idx => idx !== -1)
		return validIndices.length === 0 ? remainingAfterAuthPrefix.length : Math.min(...validIndices)
	})() : 0
	const authority = hasAuthority ? remainingAfterAuthPrefix.slice(0, authorityEnd) : ""
	const remainingAfterAuthority = hasAuthority ? remainingAfterAuthPrefix.slice(authorityEnd) : afterScheme

	if (hasAuthority) {
		const authorityResult = _validateAuthority(authority)
		if (authorityResult._tag === "Error") {
			return false
		}
	}

	const hashIndex = remainingAfterAuthority.indexOf("#")
	const fragment = hashIndex !== -1 ? remainingAfterAuthority.slice(hashIndex + 1) : ""
	const remainingAfterFragment = hashIndex !== -1 ? remainingAfterAuthority.slice(0, hashIndex) : remainingAfterAuthority

	if (hashIndex !== -1) {
		const fragmentResult = _validateFragment(fragment)
		if (fragmentResult._tag === "Error") {
			return false
		}
	}

	const questionIndex = remainingAfterFragment.indexOf("?")
	const query = questionIndex !== -1 ? remainingAfterFragment.slice(questionIndex + 1) : ""
	const remainingAfterQuery = questionIndex !== -1 ? remainingAfterFragment.slice(0, questionIndex) : remainingAfterFragment

	if (questionIndex !== -1) {
		const queryResult = _validateQuery(query)
		if (queryResult._tag === "Error") {
			return false
		}
	}

	const path = remainingAfterQuery

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

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Uri } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeUri from "@sitebender/toolsmith/newtypes/webTypes/uri/unsafeUri/index.ts"
import _normalizeUri from "@sitebender/toolsmith/newtypes/webTypes/uri/_normalizeUri/index.ts"
import _validateScheme from "@sitebender/toolsmith/newtypes/webTypes/uri/_validateScheme/index.ts"
import _validateAuthority from "@sitebender/toolsmith/newtypes/webTypes/uri/_validateAuthority/index.ts"
import _validatePath from "@sitebender/toolsmith/newtypes/webTypes/_validatePath/index.ts"
import _validateQuery from "@sitebender/toolsmith/newtypes/webTypes/_validateQuery/index.ts"
import _validateFragment from "@sitebender/toolsmith/newtypes/webTypes/_validateFragment/index.ts"
import { URI_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Smart constructor that validates and creates a Uri value
//++ Follows RFC 3986 (Uniform Resource Identifier)
//++ Normalizes scheme to lowercase, preserves rest
export default function uri(
	uriString: string,
): Result<ValidationError, Uri> {
	if (uriString.length === 0) {
		return error({
			code: "URI_EMPTY",
			field: "uri",
			messages: ["The system needs a URI."],
			received: uriString,
			expected: "Non-empty string in format scheme:path",
			suggestion:
				"Provide a URI like http://example.com or mailto:user@example.com",
			severity: "requirement",
		})
	}

	const normalized = _normalizeUri(uriString)

	if (normalized.length > URI_MAX_LENGTH) {
		return error({
			code: "URI_TOO_LONG",
			field: "uri",
			messages: ["The system limits URIs to 2048 characters."],
			received: normalized,
			expected: "URI with at most 2048 characters",
			suggestion: `Shorten the URI (currently ${normalized.length} characters)`,
			constraints: { maxLength: URI_MAX_LENGTH },
			severity: "requirement",
		})
	}

	const colonIndex = normalized.indexOf(":")
	if (colonIndex === -1) {
		return error({
			code: "URI_MISSING_SCHEME",
			field: "uri",
			messages: ["The system needs a scheme in URI."],
			received: normalized,
			expected: "URI with scheme: scheme:path",
			suggestion: "Add a scheme like http:// or mailto:",
			severity: "requirement",
		})
	}

	const scheme = normalized.slice(0, colonIndex)
	const afterScheme = normalized.slice(colonIndex + 1)

	const schemeResult = _validateScheme(scheme)
	if (schemeResult._tag === "Error") {
		return schemeResult
	}

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
			return authorityResult
		}
	}

	const hashIndex = remainingAfterAuthority.indexOf("#")
	const fragment = hashIndex !== -1 ? remainingAfterAuthority.slice(hashIndex + 1) : ""
	const remainingAfterFragment = hashIndex !== -1 ? remainingAfterAuthority.slice(0, hashIndex) : remainingAfterAuthority

	if (hashIndex !== -1) {
		const fragmentResult = _validateFragment(fragment)
		if (fragmentResult._tag === "Error") {
			return fragmentResult
		}
	}

	const questionIndex = remainingAfterFragment.indexOf("?")
	const query = questionIndex !== -1 ? remainingAfterFragment.slice(questionIndex + 1) : ""
	const remainingAfterQuery = questionIndex !== -1 ? remainingAfterFragment.slice(0, questionIndex) : remainingAfterFragment

	if (questionIndex !== -1) {
		const queryResult = _validateQuery(query)
		if (queryResult._tag === "Error") {
			return queryResult
		}
	}

	const path = remainingAfterQuery

	if (path.length > 0) {
		if (authority.length === 0 && path.startsWith("//")) {
			return error({
				code: "URI_PATH_AMBIGUOUS_START",
				field: "uri.path",
				messages: [
					"The system does not allow path to start with // when no authority present.",
				],
				received: path,
				expected: "Path not starting with // (or use authority)",
				suggestion: "Remove leading / or add authority (//host)",
				severity: "requirement",
			})
		}

		if (authority.length > 0 && !path.startsWith("/") && path.length > 0) {
			return error({
				code: "URI_PATH_MUST_START_WITH_SLASH",
				field: "uri.path",
				messages: [
					"The system requires path to start with / when authority is present.",
				],
				received: path,
				expected: "Path starting with /",
				suggestion: "Add leading / to path",
				severity: "requirement",
			})
		}

		if (authority.length > 0) {
			const pathResult = _validatePath(path)
			if (pathResult._tag === "Error") {
				return pathResult
			}
		} else {
			const validPathRegex = /^[\p{L}\p{N}\p{M}\-._~:@!$&'()*+,;=%/]+$/u
			if (!validPathRegex.test(path)) {
				return error({
					code: "URI_PATH_INVALID_CHARACTER",
					field: "uri.path",
					messages: [
						"The system only allows valid URI path characters (letters, numbers, and -._~:@!$&'()*+,;=%/).",
					],
					received: path,
					expected: "Valid URI path characters",
					suggestion: "Remove or percent-encode invalid characters",
					severity: "requirement",
				})
			}
		}
	}

	return ok(unsafeUri(normalized))
}

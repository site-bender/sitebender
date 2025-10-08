import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/unsafeIri/index.ts"
import _normalizeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/_normalizeIri/index.ts"
import _validateIriScheme from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriScheme/index.ts"
import _validateIriAuthority from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriAuthority/index.ts"
import _validateIriPath from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriPath/index.ts"
import _validateIriQuery from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriQuery/index.ts"
import _validateIriFragment from "@sitebender/toolsmith/newtypes/webTypes/iri/_validateIriFragment/index.ts"
import { IRI_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Smart constructor that validates and creates an Iri value
//++ Follows RFC 3987 (Internationalized Resource Identifier)
//++ Normalizes using NFC, scheme to lowercase
export default function iri(
	iriString: string,
): Result<ValidationError, Iri> {
	// Empty check
	if (iriString.length === 0) {
		return error({
			code: "IRI_EMPTY",
			field: "iri",
			messages: ["The system needs an IRI."],
			received: iriString,
			expected: "Non-empty string in format scheme:path",
			suggestion:
				"Provide an IRI like http://example.com or http://例え.jp/パス",
			severity: "requirement",
		})
	}

	// Normalize first
	const normalized = _normalizeIri(iriString)

	// Length check (practical limit - larger than URI due to Unicode)
	if (normalized.length > IRI_MAX_LENGTH) {
		return error({
			code: "IRI_TOO_LONG",
			field: "iri",
			messages: ["The system limits IRIs to 8192 characters."],
			received: normalized,
			expected: "IRI with at most 8192 characters",
			suggestion: `Shorten the IRI (currently ${normalized.length} characters)`,
			constraints: { maxLength: IRI_MAX_LENGTH },
			severity: "requirement",
		})
	}

	// Find scheme separator
	const colonIndex = normalized.indexOf(":")
	if (colonIndex === -1) {
		return error({
			code: "IRI_MISSING_SCHEME",
			field: "iri",
			messages: ["The system needs a scheme in IRI."],
			received: normalized,
			expected: "IRI with scheme: scheme:path",
			suggestion: "Add a scheme like http:// or mailto:",
			severity: "requirement",
		})
	}

	const scheme = normalized.slice(0, colonIndex)
	const afterScheme = normalized.slice(colonIndex + 1)

	// Validate scheme
	const schemeResult = _validateIriScheme(scheme)
	if (schemeResult._tag === "Error") {
		return schemeResult
	}

	// Parse remaining components
	let authority = ""
	let path = ""
	let query = ""
	let fragment = ""
	let remaining = afterScheme

	// Extract authority (if present)
	if (remaining.startsWith("//")) {
		remaining = remaining.slice(2)

		// Find end of authority
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

		// Validate authority
		const authorityResult = _validateIriAuthority(authority)
		if (authorityResult._tag === "Error") {
			return authorityResult
		}
	}

	// Extract fragment (last)
	const hashIndex = remaining.indexOf("#")
	if (hashIndex !== -1) {
		fragment = remaining.slice(hashIndex + 1)
		remaining = remaining.slice(0, hashIndex)

		const fragmentResult = _validateIriFragment(fragment)
		if (fragmentResult._tag === "Error") {
			return fragmentResult
		}
	}

	// Extract query
	const questionIndex = remaining.indexOf("?")
	if (questionIndex !== -1) {
		query = remaining.slice(questionIndex + 1)
		remaining = remaining.slice(0, questionIndex)

		const queryResult = _validateIriQuery(query)
		if (queryResult._tag === "Error") {
			return queryResult
		}
	}

	// What's left is path
	path = remaining

	// Validate path
	if (path.length > 0) {
		// If no authority, path cannot start with //
		if (authority.length === 0 && path.startsWith("//")) {
			return error({
				code: "IRI_PATH_AMBIGUOUS_START",
				field: "iri.path",
				messages: [
					"The system does not allow path to start with // when no authority present.",
				],
				received: path,
				expected: "Path not starting with // (or use authority)",
				suggestion: "Remove leading / or add authority (//host)",
				severity: "requirement",
			})
		}

		// If authority present and path non-empty, must start with /
		if (authority.length > 0 && !path.startsWith("/") && path.length > 0) {
			return error({
				code: "IRI_PATH_MUST_START_WITH_SLASH",
				field: "iri.path",
				messages: [
					"The system requires path to start with / when authority is present.",
				],
				received: path,
				expected: "Path starting with /",
				suggestion: "Add leading / to path",
				severity: "requirement",
			})
		}

		const pathResult = _validateIriPath(path)
		if (pathResult._tag === "Error") {
			return pathResult
		}
	}

	return ok(unsafeIri(normalized))
}

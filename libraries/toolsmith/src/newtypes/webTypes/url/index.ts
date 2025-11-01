import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Url } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeUrl from "@sitebender/toolsmith/newtypes/webTypes/url/unsafeUrl/index.ts"
import _normalizeUrl from "@sitebender/toolsmith/newtypes/webTypes/url/_normalizeUrl/index.ts"
import _validateProtocol from "@sitebender/toolsmith/newtypes/webTypes/url/_validateProtocol/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/webTypes/_validateDomain/index.ts"
import _validatePort from "@sitebender/toolsmith/newtypes/webTypes/_validatePort/index.ts"
import _validatePath from "@sitebender/toolsmith/newtypes/webTypes/_validatePath/index.ts"
import _validateQuery from "@sitebender/toolsmith/newtypes/webTypes/_validateQuery/index.ts"
import _validateFragment from "@sitebender/toolsmith/newtypes/webTypes/_validateFragment/index.ts"
import { URL_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Smart constructor that validates and creates a Url value
//++ Follows RFC 3986 with restrictions (no IP addresses, requires domain)
//++ Normalizes protocol and domain to lowercase with NFC Unicode normalization
export default function url(urlString: string): Result<ValidationError, Url> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides Url validation wrapper
	if (urlString.length === 0) {
		return error({
			code: "URL_EMPTY",
			field: "url",
			messages: ["The system needs a URL."],
			received: urlString,
			expected: "Non-empty string in format protocol://domain",
			suggestion: "Provide a URL like https://example.com",
			severity: "requirement",
		})
	}

	const normalized = _normalizeUrl(urlString)

	//++ [EXCEPTION] .length and > permitted in Toolsmith for performance - provides Url validation wrapper
	if (normalized.length > URL_MAX_LENGTH) {
		return error({
			code: "URL_TOO_LONG",
			field: "url",
			messages: ["The system limits URLs to 2048 characters."],
			received: normalized,
			expected: "URL with at most 2048 characters",
			suggestion: `Shorten the URL (currently ${normalized.length} characters)`,
			constraints: { maxLength: URL_MAX_LENGTH },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .indexOf() and === permitted in Toolsmith for performance - provides Url validation wrapper
	const protocolEndIndex = normalized.indexOf("://")
	if (protocolEndIndex === -1) {
		return error({
			code: "URL_MISSING_PROTOCOL_SEPARATOR",
			field: "url",
			messages: ["The system needs :// after the protocol."],
			received: normalized,
			expected: "URL with protocol:// format",
			suggestion: "Add :// after the protocol (e.g., https://example.com)",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .slice() and + permitted in Toolsmith for performance - provides Url validation wrapper
	const protocol = normalized.slice(0, protocolEndIndex)
	const protocolResult = _validateProtocol(protocol)
	if (protocolResult._tag === "Error") {
		return protocolResult
	}

	const afterProtocol = normalized.slice(protocolEndIndex + 3)

	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides Url validation wrapper
	if (afterProtocol.length === 0) {
		return error({
			code: "URL_MISSING_DOMAIN",
			field: "url",
			messages: ["The system needs a domain after the protocol."],
			received: normalized,
			expected: "URL with domain (e.g., https://example.com)",
			suggestion: "Add a domain after the protocol",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .search(), ===, .slice(), .lastIndexOf(), and + permitted in Toolsmith for performance - provides Url validation wrapper
	const pathStartIndex = afterProtocol.search(/[/?#]/)
	const authorityPart = pathStartIndex === -1
		? afterProtocol
		: afterProtocol.slice(0, pathStartIndex)

	const colonIndex = authorityPart.lastIndexOf(":")
	const domain = colonIndex === -1
		? authorityPart
		: authorityPart.slice(0, colonIndex)
	const port = colonIndex === -1 ? "" : authorityPart.slice(colonIndex + 1)

	const domainResult = _validateDomain(domain)
	if (domainResult._tag === "Error") {
		return domainResult
	}

	const portResult = _validatePort(port)
	if (portResult._tag === "Error") {
		return portResult
	}

	if (pathStartIndex === -1) {
		return ok(unsafeUrl(normalized))
	}

	//++ [EXCEPTION] .slice(), .indexOf(), ===, !==, <, &&, and + permitted in Toolsmith for performance - provides Url validation wrapper
	const afterAuthority = afterProtocol.slice(pathStartIndex)
	const queryStartIndex = afterAuthority.indexOf("?")
	const fragmentStartIndex = afterAuthority.indexOf("#")

	let path = ""
	let query = ""
	let fragment = ""

	if (queryStartIndex === -1 && fragmentStartIndex === -1) {
		path = afterAuthority
	} else if (queryStartIndex !== -1 && fragmentStartIndex === -1) {
		path = afterAuthority.slice(0, queryStartIndex)
		query = afterAuthority.slice(queryStartIndex + 1)
	} else if (queryStartIndex === -1 && fragmentStartIndex !== -1) {
		path = afterAuthority.slice(0, fragmentStartIndex)
		fragment = afterAuthority.slice(fragmentStartIndex + 1)
	} else {
		if (queryStartIndex < fragmentStartIndex) {
			path = afterAuthority.slice(0, queryStartIndex)
			query = afterAuthority.slice(queryStartIndex + 1, fragmentStartIndex)
			fragment = afterAuthority.slice(fragmentStartIndex + 1)
		} else {
			path = afterAuthority.slice(0, fragmentStartIndex)
			fragment = afterAuthority.slice(fragmentStartIndex + 1)
		}
	}

	const pathResult = _validatePath(path)
	if (pathResult._tag === "Error") {
		return pathResult
	}

	const queryResult = _validateQuery(query)
	if (queryResult._tag === "Error") {
		return queryResult
	}

	const fragmentResult = _validateFragment(fragment)
	if (fragmentResult._tag === "Error") {
		return fragmentResult
	}

	return ok(unsafeUrl(normalized))
}

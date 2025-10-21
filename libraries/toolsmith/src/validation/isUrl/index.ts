import type { Url } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateProtocol from "@sitebender/toolsmith/newtypes/webTypes/url/_validateProtocol/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/webTypes/_validateDomain/index.ts"
import _validatePort from "@sitebender/toolsmith/newtypes/webTypes/_validatePort/index.ts"
import _validatePath from "@sitebender/toolsmith/newtypes/webTypes/_validatePath/index.ts"
import _validateQuery from "@sitebender/toolsmith/newtypes/webTypes/_validateQuery/index.ts"
import _validateFragment from "@sitebender/toolsmith/newtypes/webTypes/_validateFragment/index.ts"

//++ Type predicate that checks if a string is a valid Url
//++ Returns true only if all URL components pass validation
export default function isUrl(value: string): value is Url {
	const protocolEndIndex = value.indexOf("://")
	if (protocolEndIndex === -1) {
		return false
	}

	const protocol = value.slice(0, protocolEndIndex)
	const protocolResult = _validateProtocol(protocol)
	if (protocolResult._tag === "Error") {
		return false
	}

	const afterProtocol = value.slice(protocolEndIndex + 3)

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
		return false
	}

	const portResult = _validatePort(port)
	if (portResult._tag === "Error") {
		return false
	}

	if (pathStartIndex === -1) {
		return true
	}

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
		return false
	}

	const queryResult = _validateQuery(query)
	if (queryResult._tag === "Error") {
		return false
	}

	const fragmentResult = _validateFragment(fragment)
	if (fragmentResult._tag === "Error") {
		return false
	}

	return true
}

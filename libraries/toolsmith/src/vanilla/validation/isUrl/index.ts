import arrayIsEmpty from "../../array/isEmpty/index.ts"
import isEmpty from "../isEmpty/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
//++ URL validator — WHATWG-compliant via URL() with optional constraints
type UrlOptions = {
	protocols?: Array<string>
	allowedDomains?: Array<string>
	requireDomain?: string
	requirePath?: boolean
	disallowLocalhost?: boolean
}

export default function isUrl(options: UrlOptions = {}) {
	return function validateUrl(value: unknown): boolean {
		if (typeof value !== "string" || isEmpty(value.trim())) {
			return false
		}

		try {
			const url = new URL(value)

			// Check protocol restrictions
			if (options.protocols && !arrayIsEmpty(options.protocols)) {
				const protocol = url.protocol.slice(0, -1) // Remove trailing ':'
				if (!options.protocols.includes(protocol)) {
					return false
				}
			}

			// Check domain requirements
			if (options.requireDomain) {
				if (!url.hostname.endsWith(options.requireDomain)) {
					return false
				}
			}

			// Check allowed domains
			if (
				options.allowedDomains && !arrayIsEmpty(options.allowedDomains)
			) {
				const isAllowed = options.allowedDomains.some(
					function checkDomain(domain) {
						return url.hostname === domain ||
							url.hostname.endsWith(`.${domain}`)
					},
				)
				if (!isAllowed) {
					return false
				}
			}

			// Check path requirement
			if (options.requirePath) {
				if (url.pathname === "/" || url.pathname === "") {
					return false
				}
			}

			// Check localhost restriction
			if (options.disallowLocalhost) {
				const localhostPatterns = new Set([
					"localhost",
					"127.0.0.1",
					"[::1]", // IPv6 localhost needs brackets in URL hostname
					"::1", // Also check without brackets for compatibility
					"0.0.0.0",
				])
				if (localhostPatterns.has(url.hostname)) {
					return false
				}
			}

			return true
		} catch {
			return false
		}
	}
}

//?? [EXAMPLE] isUrl()("https://example.com") // true
//?? [EXAMPLE] isUrl({ protocols: ["https"] })("http://example.com") // false

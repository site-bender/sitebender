import arrayIsEmpty from "../../array/isEmpty/index.ts"
import isEmpty from "../isEmpty/index.ts"

/**
 * Validates if a string is a valid URL
 *
 * Checks whether a string represents a valid URL according to the WHATWG URL
 * Standard. Uses the native URL constructor for validation, ensuring compliance
 * with web standards. Supports various URL schemes including http, https, ftp,
 * and others. Returns true for valid URLs, false for invalid formats or non-string values.
 *
 * URL validation rules:
 * - Must be a valid URL according to WHATWG URL Standard
 * - Supports absolute URLs with scheme (http://, https://, ftp://, etc.)
 * - Validates URL structure including protocol, host, path, query, and fragment
 * - Does not validate if the URL is reachable or exists
 * - Protocol-relative URLs (//example.com) are valid with a base URL
 * - Data URLs and blob URLs are supported
 * - Returns false for relative paths without a base URL
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates URL strings
 * @example
 * ```typescript
 * // Basic validation
 * const isValidUrl = isUrl()
 * isValidUrl("https://example.com")       // true
 * isValidUrl("http://example.com:8080")   // true
 * isValidUrl("example.com")               // false (no protocol)
 * isValidUrl("/path/to/page")             // false (relative)
 *
 * // Protocol-specific
 * const isHttpsUrl = isUrl({ protocols: ["https"] })
 * isHttpsUrl("https://secure.example.com")  // true
 * isHttpsUrl("http://example.com")          // false
 *
 * // Domain restrictions
 * const isTrustedUrl = isUrl({
 *   protocols: ["https"],
 *   allowedDomains: ["example.com", "trusted.org"]
 * })
 * isTrustedUrl("https://example.com/api")   // true
 * isTrustedUrl("https://untrusted.com")     // false
 *
 * // Form validation
 * const validateWebsite = (input: unknown): string | null =>
 *   typeof input !== "string" ? "Must be text" :
 *   !isUrl({ protocols: ["http", "https"] })(input) ?
 *     "Invalid URL" : null
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
type UrlOptions = {
	protocols?: Array<string>
	allowedDomains?: Array<string>
	requireDomain?: string
	requirePath?: boolean
	disallowLocalhost?: boolean
}

const isUrl = (options: UrlOptions = {}): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
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
				const isAllowed = options.allowedDomains.some((domain) =>
					url.hostname === domain ||
					url.hostname.endsWith(`.${domain}`)
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

export default isUrl

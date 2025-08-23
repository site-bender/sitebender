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
 * // Basic URL validation (any protocol)
 * const isValidUrl = isUrl()
 * 
 * isValidUrl("https://example.com")           // true
 * isValidUrl("http://www.example.com")        // true
 * isValidUrl("https://api.example.com/v1")    // true
 * isValidUrl("ftp://files.example.com")       // true
 * isValidUrl("mailto:user@example.com")       // true
 * isValidUrl("tel:+1234567890")               // true
 * isValidUrl("example.com")                   // false (no protocol)
 * isValidUrl("/path/to/page")                 // false (relative path)
 * isValidUrl("not a url")                     // false
 * 
 * // Protocol-specific validation
 * const isHttpsUrl = isUrl({ protocols: ["https"] })
 * 
 * isHttpsUrl("https://secure.example.com")    // true
 * isHttpsUrl("http://example.com")            // false (not https)
 * isHttpsUrl("ftp://files.example.com")       // false (not https)
 * 
 * // Multiple allowed protocols
 * const isWebUrl = isUrl({ protocols: ["http", "https"] })
 * 
 * isWebUrl("https://example.com")             // true
 * isWebUrl("http://example.com")              // true
 * isWebUrl("ftp://example.com")               // false
 * isWebUrl("file:///path/to/file")            // false
 * 
 * // Require specific domains
 * const isCompanyUrl = isUrl({ 
 *   protocols: ["https"],
 *   requireDomain: "example.com"
 * })
 * 
 * isCompanyUrl("https://example.com")         // true
 * isCompanyUrl("https://api.example.com")     // true (subdomain)
 * isCompanyUrl("https://other.com")           // false
 * 
 * // Allowed domains list
 * const isTrustedUrl = isUrl({
 *   protocols: ["https"],
 *   allowedDomains: ["example.com", "trusted.org"]
 * })
 * 
 * isTrustedUrl("https://example.com/page")    // true
 * isTrustedUrl("https://trusted.org/api")     // true
 * isTrustedUrl("https://untrusted.com")       // false
 * 
 * // URL with query parameters
 * const urlWithParams = "https://api.example.com/search?q=test&page=1"
 * isValidUrl(urlWithParams)                   // true
 * 
 * // URL with fragment
 * const urlWithHash = "https://docs.example.com/guide#section-2"
 * isValidUrl(urlWithHash)                     // true
 * 
 * // URL with authentication
 * const urlWithAuth = "https://user:pass@example.com"
 * isValidUrl(urlWithAuth)                     // true
 * 
 * // URL with port
 * const urlWithPort = "https://example.com:8080/api"
 * isValidUrl(urlWithPort)                     // true
 * 
 * // International domains (IDN)
 * isValidUrl("https://例え.jp")               // true
 * isValidUrl("https://münchen.de")            // true
 * isValidUrl("https://xn--fsq.jp")            // true (punycode)
 * 
 * // Data URLs
 * isValidUrl("data:text/plain;base64,SGVsbG8=") // true
 * isValidUrl("data:image/png;base64,iVBOR...")   // true
 * 
 * // Blob URLs
 * isValidUrl("blob:https://example.com/uuid")  // true
 * 
 * // Special protocols
 * isValidUrl("javascript:void(0)")            // true
 * isValidUrl("about:blank")                   // true
 * isValidUrl("chrome://settings")             // true
 * 
 * // Invalid URLs
 * isValidUrl("")                              // false (empty string)
 * isValidUrl(" ")                             // false (whitespace)
 * isValidUrl("//example.com")                 // false (protocol-relative without base)
 * isValidUrl("example.com/path")              // false (no protocol)
 * isValidUrl("ht!tp://example.com")           // false (invalid protocol)
 * isValidUrl("http://")                       // false (no host)
 * isValidUrl("http://.com")                   // false (invalid host)
 * isValidUrl(null)                            // false
 * isValidUrl(undefined)                       // false
 * isValidUrl(123)                             // false
 * isValidUrl({})                              // false
 * 
 * // Form validation
 * const validateWebsite = (input: unknown): string | null => {
 *   if (typeof input !== "string") {
 *     return "Website must be text"
 *   }
 *   
 *   if (input.trim().length === 0) {
 *     return "Website is required"
 *   }
 *   
 *   const isValidWebsite = isUrl({ protocols: ["http", "https"] })
 *   if (!isValidWebsite(input)) {
 *     return "Please enter a valid website URL"
 *   }
 *   
 *   return null
 * }
 * 
 * // API endpoint validation
 * const isValidApiEndpoint = isUrl({
 *   protocols: ["https"],
 *   requirePath: true
 * })
 * 
 * isValidApiEndpoint("https://api.example.com/v1/users")  // true
 * isValidApiEndpoint("https://api.example.com")          // false (no path)
 * 
 * // Filtering valid links
 * const links = [
 *   "https://example.com",
 *   "not-a-url",
 *   "http://api.example.com",
 *   "/relative/path",
 *   "ftp://files.example.com"
 * ]
 * 
 * const webLinks = links.filter(isUrl({ protocols: ["http", "https"] }))
 * // ["https://example.com", "http://api.example.com"]
 * 
 * // Social media URL validation
 * const isSocialMediaUrl = isUrl({
 *   protocols: ["https"],
 *   allowedDomains: [
 *     "twitter.com",
 *     "x.com",
 *     "facebook.com",
 *     "instagram.com",
 *     "linkedin.com",
 *     "youtube.com"
 *   ]
 * })
 * 
 * isSocialMediaUrl("https://twitter.com/username")        // true
 * isSocialMediaUrl("https://linkedin.com/in/profile")     // true
 * isSocialMediaUrl("https://example.com")                 // false
 * 
 * // Resource URL validation
 * interface Resource {
 *   name: string
 *   url: string
 *   type: string
 * }
 * 
 * function validateResources(
 *   resources: Array<Resource>
 * ): Array<{ resource: Resource; valid: boolean }> {
 *   const isValidResource = isUrl({ protocols: ["https"] })
 *   
 *   return resources.map(resource => ({
 *     resource,
 *     valid: isValidResource(resource.url)
 *   }))
 * }
 * 
 * // Image URL validation
 * const isImageUrl = (url: string): boolean => {
 *   const isValidImageUrl = isUrl({ protocols: ["http", "https"] })
 *   
 *   if (!isValidImageUrl(url)) {
 *     return false
 *   }
 *   
 *   // Check for image extensions
 *   const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]
 *   const urlPath = new URL(url).pathname.toLowerCase()
 *   
 *   return imageExtensions.some(ext => urlPath.endsWith(ext))
 * }
 * 
 * isImageUrl("https://example.com/image.jpg")   // true
 * isImageUrl("https://example.com/doc.pdf")     // false
 * 
 * // Download link validation
 * const isDownloadUrl = isUrl({
 *   protocols: ["https"],
 *   requirePath: true
 * })
 * 
 * function validateDownloadLink(url: string): boolean {
 *   if (!isDownloadUrl(url)) {
 *     return false
 *   }
 *   
 *   try {
 *     const urlObj = new URL(url)
 *     // Check if path suggests a downloadable file
 *     return urlObj.pathname.includes(".")
 *   } catch {
 *     return false
 *   }
 * }
 * 
 * // Webhook URL validation
 * const isWebhookUrl = isUrl({
 *   protocols: ["https"],
 *   requirePath: true,
 *   disallowLocalhost: true
 * })
 * 
 * isWebhookUrl("https://api.example.com/webhook")  // true
 * isWebhookUrl("http://localhost:3000/webhook")    // false
 * isWebhookUrl("https://127.0.0.1/webhook")        // false
 * 
 * // CDN URL validation
 * const isCdnUrl = isUrl({
 *   protocols: ["https"],
 *   allowedDomains: [
 *     "cdn.jsdelivr.net",
 *     "unpkg.com",
 *     "cdnjs.cloudflare.com",
 *     "cdn.example.com"
 *   ]
 * })
 * 
 * isCdnUrl("https://cdn.jsdelivr.net/npm/package")  // true
 * isCdnUrl("https://unpkg.com/react@18/")           // true
 * isCdnUrl("https://example.com/script.js")         // false
 * 
 * // Repository URL validation
 * const isRepoUrl = isUrl({
 *   protocols: ["https"],
 *   allowedDomains: ["github.com", "gitlab.com", "bitbucket.org"]
 * })
 * 
 * isRepoUrl("https://github.com/user/repo")         // true
 * isRepoUrl("https://gitlab.com/group/project")     // true
 * isRepoUrl("https://example.com/repo")             // false
 * 
 * // Base URL extraction
 * function extractBaseUrl(url: string): string | null {
 *   const validator = isUrl()
 *   
 *   if (!validator(url)) {
 *     return null
 *   }
 *   
 *   try {
 *     const urlObj = new URL(url)
 *     return `${urlObj.protocol}//${urlObj.host}`
 *   } catch {
 *     return null
 *   }
 * }
 * 
 * extractBaseUrl("https://api.example.com/v1/users?page=1")
 * // "https://api.example.com"
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Standards-based - Uses WHATWG URL Standard
 * @property Configurable - Options for protocols, domains, and other constraints
 * @property International - Supports IDN and punycode
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
type UrlOptions = {
	protocols?: Array<string>
	allowedDomains?: Array<string>
	requireDomain?: string
	requirePath?: boolean
	disallowLocalhost?: boolean
}

const isUrl = (options: UrlOptions = {}): ((value: unknown) => boolean) => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.trim().length === 0) {
			return false
		}
		
		try {
			const url = new URL(value)
			
			// Check protocol restrictions
			if (options.protocols && options.protocols.length > 0) {
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
			if (options.allowedDomains && options.allowedDomains.length > 0) {
				const isAllowed = options.allowedDomains.some(domain => 
					url.hostname === domain || url.hostname.endsWith(`.${domain}`)
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
				const localhostPatterns = [
					"localhost",
					"127.0.0.1",
					"[::1]",
					"0.0.0.0"
				]
				if (localhostPatterns.includes(url.hostname)) {
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
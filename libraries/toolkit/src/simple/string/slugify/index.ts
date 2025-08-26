/**
 * Converts a string to a URL-safe slug
 *
 * Transforms a string into a URL-friendly format by converting to lowercase,
 * removing diacritics, replacing spaces and special characters with hyphens,
 * and removing any non-alphanumeric characters (except hyphens). Multiple
 * consecutive hyphens are collapsed to a single hyphen, and leading/trailing
 * hyphens are removed. Perfect for creating SEO-friendly URLs, file names,
 * or identifiers.
 *
 * @pure
 * @immutable
 * @safe
 * @param str - String to convert to slug
 * @returns URL-safe slug string
 * @example
 * ```typescript
 * // Basic slugification
 * slugify("Hello World")
 * // "hello-world"
 *
 * // Special characters removed
 * slugify("Hello, World!")
 * // "hello-world"
 *
 * // Numbers preserved
 * slugify("Product 123")
 * // "product-123"
 *
 * // Accented characters
 * slugify("Café résumé")
 * // "cafe-resume"
 *
 * // Empty string and edge cases
 * slugify("")
 * // ""
 * slugify("!@#$%^&*()")
 * // ""
 *
 * // URL from title
 * slugify("My First Blog Post!")
 * // "my-first-blog-post"
 *
 * // Create URL path
 * const createUrlPath = (category: string, title: string) => {
 *   return `/${slugify(category)}/${slugify(title)}`
 * }
 * createUrlPath("Tech News", "Apple Releases New iPhone")
 * // "/tech-news/apple-releases-new-iphone"
 *
 * // Handle null/undefined gracefully
 * slugify(null)       // ""
 * slugify(undefined)  // ""
 * ```
 */
const slugify = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	return str
		// Convert to lowercase
		.toLowerCase()
		// Normalize and remove diacritics
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		// Remove all apostrophes and quotation marks entirely
		.replace(/['''''""""`„"«»‹›]/g, "")
		// Replace non-alphanumeric characters with hyphens
		.replace(/[^a-z0-9]+/g, "-")
		// Remove leading and trailing hyphens
		.replace(/^-+|-+$/g, "")
}

export default slugify

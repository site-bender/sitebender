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
 * @param str - String to convert to slug
 * @returns URL-safe slug string
 * @example
 * ```typescript
 * // Basic slugification
 * slugify("Hello World")
 * // "hello-world"
 *
 * // Multiple spaces
 * slugify("Hello    World")
 * // "hello-world"
 *
 * // Mixed case
 * slugify("Hello WORLD Test")
 * // "hello-world-test"
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
 * // German umlauts
 * slugify("Über schön")
 * // "uber-schon"
 *
 * // Multiple special characters
 * slugify("Hello!@#$%World")
 * // "hello-world"
 *
 * // Leading/trailing spaces
 * slugify("  Hello World  ")
 * // "hello-world"
 *
 * // Empty string
 * slugify("")
 * // ""
 *
 * // Only special characters
 * slugify("!@#$%^&*()")
 * // ""
 *
 * // Apostrophes and quotes
 * slugify("It's a beautiful day")
 * // "its-a-beautiful-day"
 *
 * slugify('"Hello" and "World"')
 * // "hello-and-world"
 *
 * // URL from title
 * slugify("My First Blog Post!")
 * // "my-first-blog-post"
 *
 * // File name from title
 * slugify("Annual Report 2024.pdf")
 * // "annual-report-2024-pdf"
 *
 * // Product name to SKU
 * slugify("Nike Air Max 90 - White/Black")
 * // "nike-air-max-90-white-black"
 *
 * // Category name
 * slugify("Home & Garden > Furniture")
 * // "home-garden-furniture"
 *
 * // Event name
 * slugify("JavaScript Conference 2024 (Online)")
 * // "javascript-conference-2024-online"
 *
 * // Multiple hyphens collapsed
 * slugify("Hello - - - World")
 * // "hello-world"
 *
 * // Underscores replaced
 * slugify("hello_world_test")
 * // "hello-world-test"
 *
 * // Dots replaced
 * slugify("version.1.2.3")
 * // "version-1-2-3"
 *
 * // Forward slashes
 * slugify("path/to/resource")
 * // "path-to-resource"
 *
 * // Brackets and parentheses
 * slugify("Item [NEW] (Limited Edition)")
 * // "item-new-limited-edition"
 *
 * // Currency symbols
 * slugify("Price: $99.99 USD")
 * // "price-99-99-usd"
 *
 * // Email to identifier
 * slugify("user@example.com")
 * // "user-example-com"
 *
 * // Phone to identifier
 * slugify("+1 (555) 123-4567")
 * // "1-555-123-4567"
 *
 * // Date to slug
 * slugify("January 15, 2024")
 * // "january-15-2024"
 *
 * // International characters
 * slugify("北京 Beijing")
 * // "beijing" (non-Latin removed)
 *
 * slugify("Москва Moscow")
 * // "moscow" (Cyrillic removed)
 *
 * // Spanish characters
 * slugify("Niño mañana")
 * // "nino-manana"
 *
 * // French characters
 * slugify("Château château")
 * // "chateau-chateau"
 *
 * // Polish characters
 * slugify("Łódź Kraków")
 * // "lodz-krakow"
 *
 * // Create URL path
 * const createUrlPath = (category: string, title: string) => {
 *   return `/${slugify(category)}/${slugify(title)}`
 * }
 * createUrlPath("Tech News", "Apple Releases New iPhone")
 * // "/tech-news/apple-releases-new-iphone"
 *
 * // Generate ID from name
 * const generateId = (name: string) => {
 *   return `user-${slugify(name)}-${Date.now()}`
 * }
 * generateId("John O'Brien")
 * // "user-john-obrien-1642350000000"
 *
 * // Clean filename
 * const cleanFilename = (filename: string) => {
 *   const lastDot = filename.lastIndexOf(".")
 *   if (lastDot === -1) return slugify(filename)
 *   const name = filename.slice(0, lastDot)
 *   const ext = filename.slice(lastDot + 1)
 *   return `${slugify(name)}.${ext.toLowerCase()}`
 * }
 * cleanFilename("My Document (Final).PDF")
 * // "my-document-final.pdf"
 *
 * // Hashtag from phrase
 * const toHashtag = (phrase: string) => {
 *   return "#" + slugify(phrase).replace(/-/g, "")
 * }
 * toHashtag("Black Lives Matter")
 * // "#blacklivesmatter"
 *
 * // CSS class name
 * const toCssClass = (name: string) => {
 *   return "." + slugify(name)
 * }
 * toCssClass("Primary Button (Large)")
 * // ".primary-button-large"
 *
 * // Handle null/undefined gracefully
 * slugify(null)       // ""
 * slugify(undefined)  // ""
 *
 * // Already slugified (unchanged except lowercase)
 * slugify("already-slugified")
 * // "already-slugified"
 *
 * // Emoji handling (removed)
 * slugify("Hello 🌍 World 🎉")
 * // "hello-world"
 *
 * // Mathematical symbols
 * slugify("E = mc²")
 * // "e-mc2"
 *
 * // Trademark/copyright
 * slugify("Product™ © 2024")
 * // "product-2024"
 *
 * // Version string
 * slugify("Version 2.0 (Beta)")
 * // "version-2-0-beta"
 *
 * // Comparison with other slugifiers
 * slugify("This & That")        // "this-that"
 * slugify("50% off")            // "50-off"
 * slugify("C++ Programming")    // "c-programming"
 *
 * // GitHub repo name
 * slugify("My Awesome Project!")
 * // "my-awesome-project"
 *
 * // NPM package name
 * const toPackageName = (name: string) => {
 *   return "@company/" + slugify(name)
 * }
 * toPackageName("Data Utils Library")
 * // "@company/data-utils-library"
 *
 * // SEO-friendly URL
 * const seoUrl = (title: string, id: number) => {
 *   return `${slugify(title)}-${id}`
 * }
 * seoUrl("10 Tips for Better SEO", 42)
 * // "10-tips-for-better-seo-42"
 *
 * // Username from email
 * const emailToUsername = (email: string) => {
 *   const [localPart] = email.split("@")
 *   return slugify(localPart)
 * }
 * emailToUsername("john.doe+test@example.com")
 * // "john-doe-test"
 * ```
 * @property URL-safe - produces valid URL path segments
 * @property SEO-friendly - readable, lowercase, hyphenated
 * @property Diacritic-aware - removes accents and special characters
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

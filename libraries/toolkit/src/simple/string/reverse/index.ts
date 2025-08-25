/**
 * Reverses the characters in a string
 *
 * Returns a new string with the characters in reverse order. This function
 * properly handles Unicode characters, including emojis and combining
 * characters, when Intl.Segmenter is available. Falls back to basic
 * reversal for simpler cases. Useful for palindrome checking, text effects,
 * or string manipulation puzzles.
 *
 * @param str - String to reverse
 * @returns String with characters in reverse order
 * @example
 * ```typescript
 * // Basic reversal
 * reverse("hello")
 * // "olleh"
 *
 * // Single character
 * reverse("a")
 * // "a"
 *
 * // Empty string
 * reverse("")
 * // ""
 *
 * // Numbers and symbols
 * reverse("123!@#")
 * // "#@!321"
 *
 * // Spaces preserved
 * reverse("hello world")
 * // "dlrow olleh"
 *
 * // Palindrome checking
 * const isPalindrome = (s: string) => {
 *   const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "")
 *   return clean === reverse(clean)
 * }
 * isPalindrome("racecar")     // true
 * isPalindrome("A man a plan a canal Panama")  // true
 * isPalindrome("hello")       // false
 *
 * // Mixed case
 * reverse("HeLLo WoRLd")
 * // "dLRoW oLLeH"
 *
 * // Special characters
 * reverse("Hello, World!")
 * // "!dlroW ,olleH"
 *
 * // Newlines and tabs
 * reverse("line1\nline2\ttab")
 * // "bat\t2enil\n1enil"
 *
 * // Unicode characters
 * reverse("Hello 世界")
 * // "界世 olleH"
 *
 * // Emojis (properly handled with Intl.Segmenter)
 * reverse("Hello 🌍 World 🎉")
 * // "🎉 dlroW 🌍 olleH"
 *
 * // Complex emoji (family)
 * reverse("👨‍👩‍👧‍👦")
 * // "👨‍👩‍👧‍👦" (single grapheme, stays intact with Intl.Segmenter)
 *
 * // Combining characters (with Intl.Segmenter)
 * reverse("café")  // é as single character
 * // "éfac"
 *
 * // Mathematical notation
 * reverse("a + b = c")
 * // "c = b + a"
 *
 * // URL reversal
 * reverse("https://example.com")
 * // "moc.elpmaxe//:sptth"
 *
 * // Path reversal
 * reverse("/usr/local/bin")
 * // "nib/lacol/rsu/"
 *
 * // Sentence reversal
 * reverse("The quick brown fox")
 * // "xof nworb kciuq ehT"
 *
 * // Reverse words but not characters
 * const reverseWords = (str: string) => {
 *   return str.split(" ").reverse().join(" ")
 * }
 * reverseWords("Hello World Test")
 * // "Test World Hello"
 *
 * // Reverse each word individually
 * const reverseEachWord = (str: string) => {
 *   return str.split(" ").map(reverse).join(" ")
 * }
 * reverseEachWord("Hello World")
 * // "olleH dlroW"
 *
 * // Double reversal (identity)
 * reverse(reverse("hello"))
 * // "hello"
 *
 * // Binary string
 * reverse("10110101")
 * // "10101101"
 *
 * // HTML tags
 * reverse("<div>content</div>")
 * // ">vid/<tnetnoc>vid<"
 *
 * // JSON string
 * reverse('{"key": "value"}')
 * // '}"eulav" :"yek"{'
 *
 * // Email address
 * reverse("user@example.com")
 * // "moc.elpmaxe@resu"
 *
 * // Phone number
 * reverse("+1-555-123-4567")
 * // "7654-321-555-1+"
 *
 * // Date string
 * reverse("2024-01-15")
 * // "51-10-4202"
 *
 * // Time string
 * reverse("12:34:56")
 * // "65:43:21"
 *
 * // Create mirror effect
 * const mirror = (str: string) => str + reverse(str)
 * mirror("abc")  // "abccba"
 *
 * // Check if reversible
 * const isReversible = (str: string) => {
 *   const reversed = reverse(str)
 *   return reverse(reversed) === str
 * }
 * isReversible("hello")  // true (always true for proper implementation)
 *
 * // Password obfuscation (weak)
 * const weakObfuscate = (password: string) => {
 *   return reverse(password)
 * }
 * weakObfuscate("mypassword")  // "drowssapym"
 *
 * // Stack trace reversal
 * const trace = "main() -> func1() -> func2() -> error()"
 * reverse(trace)
 * // ")(rorre > )(2cnuf > )(1cnuf > )(niam"
 *
 * // Markdown reversal
 * reverse("**bold** and *italic*")
 * // "*cilati* dna **dlob**"
 *
 * // Code reversal
 * reverse("const x = 42;")
 * // ";24 = x tsnoc"
 *
 * // Handle null/undefined gracefully
 * reverse(null)       // ""
 * reverse(undefined)  // ""
 *
 * // Flags (emoji sequences) with Intl.Segmenter
 * reverse("🇺🇸🇬🇧🇯🇵")
 * // "🇯🇵🇬🇧🇺🇸" (each flag stays intact)
 *
 * // RTL text (Arabic/Hebrew)
 * reverse("مرحبا")
 * // "ابحرم"
 *
 * reverse("שלום")
 * // "םולש"
 *
 * // Musical notation
 * reverse("C D E F G A B C")
 * // "C B A G F E D C"
 *
 * // Chemical formula
 * reverse("H2SO4")
 * // "4OS2H"
 *
 * // Regular expression
 * reverse("/[a-z]+/gi")
 * // "ig/+]z-a[/"
 *
 * // File extension check
 * const getReversedExtension = (filename: string) => {
 *   const reversed = reverse(filename)
 *   const dotIndex = reversed.indexOf(".")
 *   return dotIndex === -1 ? "" : reverse(reversed.slice(0, dotIndex))
 * }
 * getReversedExtension("file.txt")  // "txt"
 *
 * // Anagram helper
 * const areAnagrams = (s1: string, s2: string) => {
 *   const clean = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "")
 *   return [...clean(s1)].sort().join("") === [...clean(s2)].sort().join("")
 * }
 * areAnagrams("listen", "silent")  // true
 *
 * // ROT13 alternative
 * const simpleEncode = (str: string) => {
 *   return reverse(str).replace(/[a-z]/gi, c =>
 *     String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13))
 *   )
 * }
 * ```
 * @property Unicode-aware - handles multi-byte characters correctly
 * @property Grapheme-safe - preserves grapheme clusters when Intl.Segmenter available
 * @property Immutable - returns new string, doesn't modify original
 */
const reverse = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	if (str.length <= 1) {
		return str
	}

	// Use Intl.Segmenter if available for proper grapheme cluster handling
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
		try {
			const segmenter = new (Intl as any).Segmenter(undefined, {
				granularity: "grapheme",
			})
			const graphemes = Array.from(
				segmenter.segment(str),
				(segment: any) => segment.segment,
			)
			return graphemes.reverse().join("")
		} catch {
			// Fall back to spread operator if Segmenter fails
		}
	}

	// Fallback: Using spread operator for basic Unicode handling
	// This handles most cases but may split complex emoji sequences
	return [...str].reverse().join("")
}

export default reverse

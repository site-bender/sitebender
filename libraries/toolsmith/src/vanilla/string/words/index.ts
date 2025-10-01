//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const words = (str: string | null | undefined): Array<string> => {
	if (!str || typeof str !== "string") {
		return []
	}

	// Convert string to array for functional processing
	const chars = Array.from(str)

	// Process characters using reduce to build words
	const wordsWithEmpty = chars.reduce<
		{ words: Array<string>; current: string }
	>(
		(acc, char, i) => {
			const nextChar = chars[i + 1] || ""
			const prevChar = chars[i - 1] || ""

			// Check if character is a delimiter
			if (/[-_\s]/.test(char)) {
				return acc.current
					? { words: [...acc.words, acc.current], current: "" }
					: acc
			}

			// Skip non-alphanumeric characters
			if (!/[a-zA-Z0-9]/.test(char)) {
				return acc.current
					? { words: [...acc.words, acc.current], current: "" }
					: acc
			}

			// Handle numbers
			if (/\d/.test(char)) {
				// If we have a current word and this is a number, split
				if (
					acc.current &&
					/[a-zA-Z]/.test(acc.current[acc.current.length - 1])
				) {
					return { words: [...acc.words, acc.current], current: char }
				}
				return { ...acc, current: acc.current + char }
			}

			// Handle letters
			if (/[a-zA-Z]/.test(char)) {
				// Transition from number to letter
				if (
					acc.current &&
					/\d/.test(acc.current[acc.current.length - 1])
				) {
					return { words: [...acc.words, acc.current], current: char }
				}

				// Transition from lowercase to uppercase (camelCase boundary)
				if (/[a-z]/.test(prevChar) && /[A-Z]/.test(char)) {
					return { words: [...acc.words, acc.current], current: char }
				}

				// Multiple uppercase letters (acronym handling)
				if (/[A-Z]/.test(prevChar) && /[A-Z]/.test(char)) {
					// If next is lowercase, this is end of acronym
					if (/[a-z]/.test(nextChar)) {
						return {
							words: [...acc.words, acc.current],
							current: char,
						}
					}
					return { ...acc, current: acc.current + char }
				}

				return { ...acc, current: acc.current + char }
			}

			return acc
		},
		{ words: [], current: "" },
	)

	// Add the last word if present and filter empty strings
	const allWords = wordsWithEmpty.current
		? [...wordsWithEmpty.words, wordsWithEmpty.current]
		: wordsWithEmpty.words

	return allWords.filter((word) => word.length > 0)
}

export default words

//++ Returns the length of a string
export default function length(str: string): number {
	return str.length
}

//?? [EXAMPLE]
// length("") // 0
// length("hello") // 5
// length(" ") // 1 (space counts)
// length("👋") // 2 (emoji may have length > 1 due to UTF-16)
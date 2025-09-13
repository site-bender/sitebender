//++ Formats an object key to sentence case

import toSentence from "../../../libraries/toolkit/src/vanilla/string/toCase/toSentence/index.ts"
import words from "../../../libraries/toolkit/src/vanilla/string/words/index.ts"
import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import pipe from "../../../libraries/toolkit/src/vanilla/combinator/pipe/index.ts"

export default function formatKey(key: string): string {
	const wordArray = words(key)
	const joined = join(" ")(wordArray)
	
	return toSentence(joined)
}

//?? [EXAMPLE]
// formatKey("primeDirective") // "Prime directive"
// formatKey("snake_case_key") // "Snake case key"
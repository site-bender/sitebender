import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import pipe from "../../../libraries/toolkit/src/vanilla/combinator/pipe/index.ts"
import toSentence from "../../../libraries/toolkit/src/vanilla/string/toCase/toSentence/index.ts"
import words from "../../../libraries/toolkit/src/vanilla/string/words/index.ts"

//++ Formats an object key to sentence case
export default function formatKey(key: string): string {
	return pipe([
		words,
		join(" "),
		toSentence,
	])(key)
}

//?? [EXAMPLE]
// formatKey("primeDirective") // "Prime directive"
// formatKey("snake_case_key") // "Snake case key"

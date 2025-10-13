import join from "../../../libraries/toolsmith/src/array/join/index.ts"
import pipe from "../../../libraries/toolsmith/src/combinator/pipe/index.ts"
import toSentence from "../../../libraries/toolsmith/src/string/toCase/toSentence/index.ts"
import words from "../../../libraries/toolsmith/src/string/words/index.ts"

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

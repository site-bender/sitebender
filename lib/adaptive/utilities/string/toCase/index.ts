import toCamel from "../toCamel/index.ts"
import toKebab from "../toKebab/index.ts"
import toLower from "../toLower/index.ts"
import toPascal from "../toPascal/index.ts"
import toScreamingSnake from "../toScreamingSnake/index.ts"
import toSentence from "../toSentence/index.ts"
import toSnake from "../toSnake/index.ts"
import toTitle from "../toTitle/index.ts"
import toTrain from "../toTrain/index.ts"
import toUpper from "../toUpper/index.ts"

type CaseConverter = (s: string) => string

type CaseType = 
	| "camel"     // camelCase
	| "kebab"     // kebab-case
	| "lower"     // lowercase
	| "pascal"    // PascalCase
	| "sentence"  // Sentence case
	| "snake"     // snake_case
	| "SNAKE"     // SCREAMING_SNAKE_CASE
	| "title"     // Title Case
	| "train"     // Train-Case
	| "upper"     // UPPERCASE

/**
 * Returns a case conversion function based on the case type
 * @param caseType - Exact case type name
 * @returns A curried function that converts strings to the specified case
 * @example
 * const converter = toCase("camel")
 * converter("hello-world") // "helloWorld"
 * 
 * // Or use it directly
 * toCase("title")("hello_world") // "Hello World"
 * toCase("SNAKE")("hello world") // "HELLO_WORLD"
 */
const toCase = (caseType: CaseType): CaseConverter => {
	switch (caseType) {
		case "camel":
			return toCamel
		case "kebab":
			return toKebab
		case "lower":
			return toLower
		case "pascal":
			return toPascal
		case "sentence":
			return toSentence
		case "snake":
			return toSnake
		case "SNAKE":
			return toScreamingSnake
		case "title":
			return toTitle
		case "train":
			return toTrain
		case "upper":
			return toUpper
	}
}

export default toCase
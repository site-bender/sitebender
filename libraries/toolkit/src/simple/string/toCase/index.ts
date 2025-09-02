import type { CaseConverter, CaseType } from "../../../types/string/index.ts"

import toCamel from "./toCamel/index.ts"
import toKebab from "./toKebab/index.ts"
import toLower from "./toLower/index.ts"
import toPascal from "./toPascal/index.ts"
import toScreamingSnake from "./toScreamingSnake/index.ts"
import toSentence from "./toSentence/index.ts"
import toSnake from "./toSnake/index.ts"
import toTitle from "./toTitle/index.ts"
import toTrain from "./toTrain/index.ts"
import toUpper from "./toUpper/index.ts"

/**
 * Returns a case conversion function based on the case type
 *
 * A higher-order function that selects and returns the appropriate case
 * conversion function based on the specified case type. This allows for
 * dynamic case conversion selection at runtime.
 *
 * @curried (caseType) => (str) => result
 * @param caseType - The type of case conversion to perform
 * @param str - The string to convert (via the returned function)
 * @returns A function that converts strings to the specified case
 * @example
 * ```typescript
 * // Get a specific converter
 * const converter = toCase("camel")
 * converter("hello-world")      // "helloWorld"
 * converter("test_case")        // "testCase"
 *
 * // Direct usage
 * toCase("title")("hello_world")  // "Hello World"
 * toCase("SNAKE")("hello world")  // "HELLO_WORLD"
 * toCase("kebab")("HelloWorld")   // "hello-world"
 * toCase("pascal")("test-case")   // "TestCase"
 *
 * // Dynamic conversion
 * const caseType = "snake" as CaseType
 * toCase(caseType)("mixedCase")   // "mixed_case"
 *
 * // All case types
 * toCase("camel")("test-case")    // "testCase"
 * toCase("kebab")("TestCase")     // "test-case"
 * toCase("lower")("HELLO")        // "hello"
 * toCase("pascal")("test_case")   // "TestCase"
 * toCase("sentence")("HELLO WORLD") // "Hello world"
 * toCase("snake")("helloWorld")   // "hello_world"
 * toCase("SNAKE")("hello-world")  // "HELLO_WORLD"
 * toCase("title")("the_story")    // "The Story"
 * toCase("train")("hello_world")  // "Hello-World"
 * toCase("upper")("hello")        // "HELLO"
 * ```
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

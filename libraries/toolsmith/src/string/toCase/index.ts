import type { CaseConverter, CaseType } from "../../types/string/index.ts"

import identity from "../../combinator/identity/index.ts"
import toCamel from "./toCamel/index.ts"
import toKebab from "./toKebab/index.ts"
import toLower from "./toLower/index.ts"
import toLowerFirst from "./toLower/index.ts"
import toPascal from "./toPascal/index.ts"
import toScreamingSnake from "./toScreamingSnake/index.ts"
import toSentence from "./toSentence/index.ts"
import toSnake from "./toSnake/index.ts"
import toTitle from "./toTitle/index.ts"
import toTrain from "./toTrain/index.ts"
import toUpper from "./toUpper/index.ts"
import toUpperFirst from "./toUpperFirst/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toCase = (caseType: CaseType): CaseConverter => {
	switch (caseType) {
		case "camel":
			return toCamel
		case "kebab":
			return toKebab
		case "lower":
			return toLower
		case "lowerFirst":
			return toLowerFirst
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
		case "upperFirst":
			return toUpperFirst
		default:
			return identity
	}
}

export default toCase

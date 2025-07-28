import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.tsx"

export interface LanguageProps {
}

type Language =
	& Thing
	& IntangibleProps
	& LanguageProps

export default Language

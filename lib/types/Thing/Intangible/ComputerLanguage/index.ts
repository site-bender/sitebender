import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import ComputerLanguageComponent from "../../../../../components/Thing/Intangible/ComputerLanguage/index.tsx"

export interface ComputerLanguageProps {
}

type ComputerLanguage =
	& Thing
	& IntangibleProps
	& ComputerLanguageProps

export default ComputerLanguage

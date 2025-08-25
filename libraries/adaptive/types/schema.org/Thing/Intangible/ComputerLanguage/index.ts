import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type ComputerLanguageType = "ComputerLanguage"

export interface ComputerLanguageProps {
	"@type"?: ComputerLanguageType
}

type ComputerLanguage = Thing & IntangibleProps & ComputerLanguageProps

export default ComputerLanguage

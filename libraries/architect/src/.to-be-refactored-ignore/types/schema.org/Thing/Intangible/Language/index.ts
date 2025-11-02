import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type LanguageType = "Language"

export interface LanguageProps {
	"@type"?: LanguageType
}

type Language = Thing & IntangibleProps & LanguageProps

export default Language

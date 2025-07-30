import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface LanguageProps {
	"@type"?: "Language"}

type Language = Thing & IntangibleProps & LanguageProps

export default Language

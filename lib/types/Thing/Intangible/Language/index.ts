// Language extends Intangible but adds no additional properties
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface LanguageProps {}

type Language =
	& Thing
	& IntangibleProps
	& LanguageProps

export default Language

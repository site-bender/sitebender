import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type RestrictedDietType = "RestrictedDiet"

export interface RestrictedDietProps {
	"@type"?: RestrictedDietType
}

type RestrictedDiet =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RestrictedDietProps

export default RestrictedDiet

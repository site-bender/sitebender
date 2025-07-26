import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface RestrictedDietProps {
}

type RestrictedDiet =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RestrictedDietProps

export default RestrictedDiet

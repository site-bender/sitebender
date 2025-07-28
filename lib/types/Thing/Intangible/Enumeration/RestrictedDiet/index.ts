import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import RestrictedDietComponent from "../../../../../../components/Thing/Intangible/Enumeration/RestrictedDiet/index.tsx"

export interface RestrictedDietProps {
}

type RestrictedDiet =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RestrictedDietProps

export default RestrictedDiet

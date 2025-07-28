import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import GenderTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/GenderType/index.tsx"

export interface GenderTypeProps {
}

type GenderType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GenderTypeProps

export default GenderType

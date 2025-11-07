import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type GenderTypeType = "GenderType"

export interface GenderTypeProps {
	"@type"?: GenderTypeType
}

type GenderType = Thing & IntangibleProps & EnumerationProps & GenderTypeProps

export default GenderType

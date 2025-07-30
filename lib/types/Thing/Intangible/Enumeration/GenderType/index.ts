import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface GenderTypeProps {
	"@type"?: "GenderType"}

type GenderType = Thing & IntangibleProps & EnumerationProps & GenderTypeProps

export default GenderType

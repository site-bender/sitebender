import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type IncentiveTypeType = "IncentiveType"

export interface IncentiveTypeProps {
	"@type"?: IncentiveTypeType
}

type IncentiveType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveTypeProps

export default IncentiveType

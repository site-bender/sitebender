import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface IncentiveTypeProps {
	"@type"?: "IncentiveType"}

type IncentiveType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveTypeProps

export default IncentiveType

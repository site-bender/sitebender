import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface IncentiveStatusProps {
}

type IncentiveStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveStatusProps

export default IncentiveStatus

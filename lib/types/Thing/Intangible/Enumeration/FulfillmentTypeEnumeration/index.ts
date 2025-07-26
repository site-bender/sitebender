import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface FulfillmentTypeEnumerationProps {
}

type FulfillmentTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& FulfillmentTypeEnumerationProps

export default FulfillmentTypeEnumeration

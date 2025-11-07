import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type FulfillmentTypeEnumerationType = "FulfillmentTypeEnumeration"

export interface FulfillmentTypeEnumerationProps {
	"@type"?: FulfillmentTypeEnumerationType
}

type FulfillmentTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& FulfillmentTypeEnumerationProps

export default FulfillmentTypeEnumeration

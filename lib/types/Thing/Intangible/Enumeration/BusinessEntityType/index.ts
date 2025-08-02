import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type BusinessEntityTypeType = "BusinessEntityType"

export interface BusinessEntityTypeProps {
	"@type"?: BusinessEntityTypeType
}

type BusinessEntityType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BusinessEntityTypeProps

export default BusinessEntityType

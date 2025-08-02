import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type BusinessFunctionType = "BusinessFunction"

export interface BusinessFunctionProps {
	"@type"?: BusinessFunctionType
}

type BusinessFunction =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BusinessFunctionProps

export default BusinessFunction

import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type PhysicalActivityCategoryType = "PhysicalActivityCategory"

export interface PhysicalActivityCategoryProps {
	"@type"?: PhysicalActivityCategoryType
}

type PhysicalActivityCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PhysicalActivityCategoryProps

export default PhysicalActivityCategory

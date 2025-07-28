import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import PhysicalActivityCategoryComponent from "../../../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"

export interface PhysicalActivityCategoryProps {
}

type PhysicalActivityCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PhysicalActivityCategoryProps

export default PhysicalActivityCategory

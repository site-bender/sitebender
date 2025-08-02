import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

import ThingComponent from "../../../../../components/Thing/index.ts"
import CategoryCodeComponent from "../../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategoryComponent from "../../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"

export type RecommendationType = "Recommendation"

export interface RecommendationProps {
	"@type"?: RecommendationType
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
}

type Recommendation =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& RecommendationProps

export default Recommendation

import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"

export interface RecommendationProps {
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
}

type Recommendation =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& RecommendationProps

export default Recommendation

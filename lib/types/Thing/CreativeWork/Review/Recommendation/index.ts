import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export interface RecommendationProps {
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
}

type Recommendation =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& RecommendationProps

export default Recommendation

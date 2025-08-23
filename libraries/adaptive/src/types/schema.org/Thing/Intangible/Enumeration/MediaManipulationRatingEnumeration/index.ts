import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MediaManipulationRatingEnumerationType =
	"MediaManipulationRatingEnumeration"

export interface MediaManipulationRatingEnumerationProps {
	"@type"?: MediaManipulationRatingEnumerationType
}

type MediaManipulationRatingEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaManipulationRatingEnumerationProps

export default MediaManipulationRatingEnumeration

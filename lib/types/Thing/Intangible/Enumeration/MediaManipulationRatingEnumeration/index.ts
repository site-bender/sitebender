import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MediaManipulationRatingEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/MediaManipulationRatingEnumeration/index.tsx"

export interface MediaManipulationRatingEnumerationProps {
}

type MediaManipulationRatingEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaManipulationRatingEnumerationProps

export default MediaManipulationRatingEnumeration

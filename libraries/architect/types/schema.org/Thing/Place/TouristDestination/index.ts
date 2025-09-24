import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { PlaceProps } from "../index.ts"
import type TouristAttraction from "../TouristAttraction/index.ts"

import AudienceComponent from "../../../../../../codewright/src/define/Thing/Intangible/Audience/index.tsx"
import TouristAttractionComponent from "../../../../../../codewright/src/define/Thing/Place/TouristAttraction/index.tsx"

export type TouristDestinationType = "TouristDestination"

export interface TouristDestinationProps {
	"@type"?: TouristDestinationType
	includesAttraction?:
		| TouristAttraction
		| ReturnType<typeof TouristAttractionComponent>
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristDestination = Thing & PlaceProps & TouristDestinationProps

export default TouristDestination

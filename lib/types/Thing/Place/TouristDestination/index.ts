import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type { PlaceProps } from "../index.ts"
import type TouristAttraction from "../TouristAttraction/index.ts"

import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"
import TouristAttractionComponent from "../../../../components/Thing/Place/TouristAttraction/index.ts"

export interface TouristDestinationProps {
	includesAttraction?:
		| TouristAttraction
		| ReturnType<typeof TouristAttractionComponent>
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristDestination = Thing & PlaceProps & TouristDestinationProps

export default TouristDestination

import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { PlaceProps } from "../index.ts"

import AudienceComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Audience/index.tsx"
import LanguageComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Language/index.tsx"

export type TouristAttractionType = "TouristAttraction"

export interface TouristAttractionProps {
	"@type"?: TouristAttractionType
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristAttraction = Thing & PlaceProps & TouristAttractionProps

export default TouristAttraction

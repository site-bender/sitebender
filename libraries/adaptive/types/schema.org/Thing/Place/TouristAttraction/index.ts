import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Audience from "../../Intangible/Audience/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type { PlaceProps } from "../index.ts"

import { Audience as AudienceComponent } from "../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../components/index.tsx"

export type TouristAttractionType = "TouristAttraction"

export interface TouristAttractionProps {
	"@type"?: TouristAttractionType
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristAttraction = Thing & PlaceProps & TouristAttractionProps

export default TouristAttraction

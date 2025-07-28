import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"

import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.tsx"

export interface AudienceProps {
	audienceType?: Text
	geographicArea?: AdministrativeArea
}

type Audience =
	& Thing
	& IntangibleProps
	& AudienceProps

export default Audience

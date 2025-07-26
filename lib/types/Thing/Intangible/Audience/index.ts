import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"

export interface AudienceProps {
	audienceType?: Text
	geographicArea?: AdministrativeArea
}

type Audience =
	& Thing
	& IntangibleProps
	& AudienceProps

export default Audience

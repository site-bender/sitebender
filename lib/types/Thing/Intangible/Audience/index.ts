import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface AudienceProps {
	/** The target group associated with a given audience (e.g. veterans, car owners, musicians, etc.). */
	audienceType?: Text
	/** The geographic area associated with the audience. */
	geographicArea?: AdministrativeArea
}

type Audience =
	& Thing
	& IntangibleProps
	& AudienceProps

export default Audience

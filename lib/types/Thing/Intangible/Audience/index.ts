import type { Text } from "../../../DataType/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Intangible from "../index.ts"

export default interface Audience extends Intangible {
	/** The target group associated with a given audience (e.g. veterans, car owners, musicians, etc.). */
	audienceType?: Text
	/** The geographic area associated with the audience. */
	geographicArea?: AdministrativeArea
}

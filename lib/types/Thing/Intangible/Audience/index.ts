import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { IntangibleProps } from "../index.ts"

import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface AudienceProps {
	"@type"?: "Audience"
	audienceType?: Text
	geographicArea?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
}

type Audience = Thing & IntangibleProps & AudienceProps

export default Audience

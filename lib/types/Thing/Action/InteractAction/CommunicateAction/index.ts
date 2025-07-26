import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

export interface CommunicateActionProps {
	about?: Thing
	inLanguage?: Language | Text
	language?: Language
	recipient?: Audience | ContactPoint | Organization | Person
}

type CommunicateAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps

export default CommunicateAction

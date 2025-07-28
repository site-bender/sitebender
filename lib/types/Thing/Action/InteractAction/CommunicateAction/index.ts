import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import ThingComponent from "../../../../../components/Thing/index.ts"
import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.ts"
import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"
import ContactPointComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface CommunicateActionProps {
	about?: Thing | ReturnType<typeof ThingComponent>
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	language?: Language | ReturnType<typeof LanguageComponent>
	recipient?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type CommunicateAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps

export default CommunicateAction

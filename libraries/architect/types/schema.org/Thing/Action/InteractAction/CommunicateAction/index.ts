import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"
import type { AskActionType } from "./AskAction/index.ts"
import type { CheckInActionType } from "./CheckInAction/index.ts"
import type { CheckOutActionType } from "./CheckOutAction/index.ts"
import type { CommentActionType } from "./CommentAction/index.ts"
import type { InformActionType } from "./InformAction/index.ts"
import type { InviteActionType } from "./InviteAction/index.ts"
import type { ReplyActionType } from "./ReplyAction/index.ts"
import type { ShareActionType } from "./ShareAction/index.ts"

import ThingComponent from "../../../../../../../codewright/src/define/Thing/index.tsx"
import AudienceComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Audience/index.tsx"
import LanguageComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Language/index.tsx"
import ContactPointComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import OrganizationComponent from "../../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type CommunicateActionType =
	| "CommunicateAction"
	| CheckOutActionType
	| ShareActionType
	| InformActionType
	| AskActionType
	| CheckInActionType
	| ReplyActionType
	| InviteActionType
	| CommentActionType

export interface CommunicateActionProps {
	"@type"?: CommunicateActionType
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

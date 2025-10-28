import type { DateTime, Text, Time, URL } from "../../DataType/index.ts"
import type HowTo from "../CreativeWork/HowTo/index.ts"
import type Thing from "../index.ts"
import type EntryPoint from "../Intangible/EntryPoint/index.ts"
import type ActionStatusType from "../Intangible/Enumeration/StatusEnumeration/ActionStatusType/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"
import type Organization from "../Organization/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type { AchieveActionType } from "./AchieveAction/index.ts"
import type { AssessActionType } from "./AssessAction/index.ts"
import type { ConsumeActionType } from "./ConsumeAction/index.ts"
import type { ControlActionType } from "./ControlAction/index.ts"
import type { CreateActionType } from "./CreateAction/index.ts"
import type { FindActionType } from "./FindAction/index.ts"
import type { InteractActionType } from "./InteractAction/index.ts"
import type { MoveActionType } from "./MoveAction/index.ts"
import type { OrganizeActionType } from "./OrganizeAction/index.ts"
import type { PlayActionType } from "./PlayAction/index.ts"
import type { SearchActionType } from "./SearchAction/index.ts"
import type { SeekToActionType } from "./SeekToAction/index.ts"
import type { SolveMathActionType } from "./SolveMathAction/index.ts"
import type { TradeActionType } from "./TradeAction/index.ts"
import type { TransferActionType } from "./TransferAction/index.ts"
import type { UpdateActionType } from "./UpdateAction/index.ts"

import HowToComponent from "../../../../../architect/src/define/Thing/CreativeWork/HowTo/index.tsx"
import ThingComponent from "../../../../../architect/src/define/Thing/index.tsx"
import EntryPointComponent from "../../../../../architect/src/define/Thing/Intangible/EntryPoint/index.tsx"
import ActionStatusTypeComponent from "../../../../../architect/src/define/Thing/Intangible/Enumeration/StatusEnumeration/ActionStatusType/index.tsx"
import PostalAddressComponent from "../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import VirtualLocationComponent from "../../../../../architect/src/define/Thing/Intangible/VirtualLocation/index.tsx"
import OrganizationComponent from "../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../architect/src/define/Thing/Person/index.tsx"
import PlaceComponent from "../../../../../architect/src/define/Thing/Place/index.tsx"

export type ActionType =
	| "Action"
	| TransferActionType
	| CreateActionType
	| SearchActionType
	| FindActionType
	| AssessActionType
	| AchieveActionType
	| SolveMathActionType
	| InteractActionType
	| OrganizeActionType
	| UpdateActionType
	| ConsumeActionType
	| ControlActionType
	| SeekToActionType
	| PlayActionType
	| MoveActionType
	| TradeActionType

export interface ActionProps {
	"@type"?: ActionType
	actionProcess?: HowTo | ReturnType<typeof HowToComponent>
	actionStatus?:
		| ActionStatusType
		| ReturnType<typeof ActionStatusTypeComponent>
	agent?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	endTime?: DateTime | Time
	error?: Thing | ReturnType<typeof ThingComponent>
	instrument?: Thing | ReturnType<typeof ThingComponent>
	location?:
		| Place
		| PostalAddress
		| Text
		| VirtualLocation
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
		| ReturnType<typeof VirtualLocationComponent>
	object?: Thing | ReturnType<typeof ThingComponent>
	participant?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	result?: Thing | ReturnType<typeof ThingComponent>
	startTime?: DateTime | Time
	target?: EntryPoint | URL | ReturnType<typeof EntryPointComponent>
}

type Action = Thing & ActionProps

export default Action

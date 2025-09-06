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

import { ActionStatusType as ActionStatusTypeComponent } from "../../../../components/index.tsx"
import { EntryPoint as EntryPointComponent } from "../../../../components/index.tsx"
import { HowTo as HowToComponent } from "../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../components/index.tsx"
import { VirtualLocation as VirtualLocationComponent } from "../../../../components/index.tsx"

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

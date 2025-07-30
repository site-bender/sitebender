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

import HowToComponent from "../../../components/Thing/CreativeWork/HowTo/index.ts"
import ThingComponent from "../../../components/Thing/index.ts"
import EntryPointComponent from "../../../components/Thing/Intangible/EntryPoint/index.ts"
import ActionStatusTypeComponent from "../../../components/Thing/Intangible/Enumeration/StatusEnumeration/ActionStatusType/index.ts"
import PostalAddressComponent from "../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import VirtualLocationComponent from "../../../components/Thing/Intangible/VirtualLocation/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../components/Thing/Person/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"

export interface ActionProps {
	"@type"?: "Action"
	actionProcess?: HowTo | ReturnType<typeof HowToComponent>
	actionStatus?: ActionStatusType | ReturnType<typeof ActionStatusTypeComponent>
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

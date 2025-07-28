import type { DateTime, Text, Time, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type ActionStatusType from "../Intangible/Enumeration/StatusEnumeration/ActionStatusType/index.ts"
import type EntryPoint from "../Intangible/EntryPoint/index.ts"
import type HowTo from "../CreativeWork/HowTo/index.ts"
import type Organization from "../Organization/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"

import ActionComponent from "../../../../components/Thing/Action/index.tsx"

export interface ActionProps {
	actionProcess?: HowTo
	actionStatus?: ActionStatusType
	agent?: Organization | Person
	endTime?: DateTime | Time
	error?: Thing
	instrument?: Thing
	location?: Place | PostalAddress | Text | VirtualLocation
	object?: Thing
	participant?: Organization | Person
	provider?: Organization | Person
	result?: Thing
	startTime?: DateTime | Time
	target?: EntryPoint | URL
}

type Action =
	& Thing
	& ActionProps

export default Action

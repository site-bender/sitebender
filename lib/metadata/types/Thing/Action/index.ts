import type { DateTime, Text, Time } from "../../DataType/index.ts"
import type {
	EntryPoint,
	HowTo,
	PostalAddress,
	Thing,
	URL,
	VirtualLocation,
} from "../index.ts"
import type { Organization } from "../Organization/index.ts"
import type { Person } from "../Person/index.ts"
import type { Place } from "../Place/index.ts"

// Action interface - extends Thing
export interface Action extends Thing {
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

export type ActionStatusType = string

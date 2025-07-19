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

export interface ActionProps {
	/** Description of the process by which the action was performed. */
	actionProcess?: HowTo
	/** Indicates the current disposition of the Action. */
	actionStatus?: ActionStatusType
	/** The direct performer or driver of the action (animate or inanimate). E.g. *John* wrote a book. */
	agent?: Organization | Person
	/** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. E.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	endTime?: Time | DateTime
	/** For failed actions, more information on the cause of the failure. */
	error?: Thing
	/** The object that helped the agent perform the action. E.g. John wrote a book with *a pen*. */
	instrument?: Thing
	/** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
	location?: VirtualLocation | PostalAddress | Place | Text
	/** The object upon which the action is carried out, whose state is kept intact or changed. Also known as the semantic roles patient, affected or undergoer (which change their state) or theme (which doesn't). E.g. John read *a book*. */
	object?: Thing
	/** Other co-agents that participated in the action indirectly. E.g. John wrote a book with *Steve*. */
	participant?: Organization | Person
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** The result produced in the action. E.g. John wrote *a book*. */
	result?: Thing
	/** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. E.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	startTime?: DateTime | Time
	/** Indicates a target EntryPoint, or url, for an Action. */
	target?: URL | EntryPoint
}

type Action =
	& Thing
	& ActionProps

export default Action
